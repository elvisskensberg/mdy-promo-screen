import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchSponsorData, clearSponsorCache } from './sponsorService'

describe('sponsorService', () => {
  beforeEach(() => {
    // Clear mocks before each test
    vi.clearAllMocks()
    localStorage.clear()
    global.fetch.mockClear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('fetchSponsorData', () => {
    it('should fetch sponsor data from Google Sheets API successfully', async () => {
      // Arrange
      const mockData = {
        data: [
          { heading: 'Sponsor 1', content: 'Content 1' },
          { heading: 'Sponsor 2', content: 'Content 2' }
        ]
      }
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      })

      // Act
      const result = await fetchSponsorData()

      // Assert
      expect(result).toHaveLength(2)
      expect(result[0]).toEqual({
        title: 'Sponsor 1',
        html: 'Content 1',
        imageUrl: '/images/1.png'
      })
      expect(global.fetch).toHaveBeenCalledTimes(1)
    })

    it('should return cached data when cache is valid', async () => {
      // Arrange
      const cachedData = [
        { title: 'Cached 1', html: 'Content 1', imageUrl: '/images/1.png' }
      ]
      localStorage.setItem('mdy_sponsor_data', JSON.stringify(cachedData))
      localStorage.setItem('mdy_sponsor_data_timestamp', Date.now().toString())

      // Act
      const result = await fetchSponsorData()

      // Assert
      expect(result).toEqual(cachedData)
      expect(global.fetch).not.toHaveBeenCalled()
    })

    it('should fallback to cache when API fails', async () => {
      // Arrange
      const cachedData = [
        { title: 'Cached 1', html: 'Content 1', imageUrl: '/images/1.png' }
      ]
      localStorage.setItem('mdy_sponsor_data', JSON.stringify(cachedData))
      localStorage.setItem('mdy_sponsor_data_timestamp', (Date.now() - 2 * 60 * 60 * 1000).toString()) // 2 hours old

      global.fetch.mockRejectedValueOnce(new Error('Network error'))

      // Act
      const result = await fetchSponsorData()

      // Assert
      expect(result).toEqual(cachedData)
    })

    it('should return default data when both API and cache fail', async () => {
      // Arrange
      global.fetch.mockRejectedValueOnce(new Error('Network error'))

      // Act
      const result = await fetchSponsorData()

      // Assert
      expect(result).toHaveLength(2)
      expect(result[0].title).toBe('Default Sponsor 1')
    })

    it('should cache successful API responses', async () => {
      // Arrange
      const mockData = {
        data: [
          { heading: 'Sponsor 1', content: 'Content 1' }
        ]
      }
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      })

      // Act
      await fetchSponsorData()

      // Assert
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'mdy_sponsor_data',
        expect.any(String)
      )
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'mdy_sponsor_data_timestamp',
        expect.any(String)
      )
    })

    it('should handle Google Sheets API v4 format', async () => {
      // Arrange
      const mockData = {
        values: [
          ['Heading', 'Content'], // Header row
          ['Sponsor 1', 'Content 1'],
          ['Sponsor 2', 'Content 2']
        ]
      }
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      })

      // Act
      const result = await fetchSponsorData()

      // Assert
      expect(result).toHaveLength(2)
      expect(result[0].title).toBe('Sponsor 1')
    })

    it('should handle HTTP error responses', async () => {
      // Arrange
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404
      })

      // Act
      const result = await fetchSponsorData()

      // Assert
      expect(result[0].title).toBe('Default Sponsor 1')
    })

    it('should filter out invalid data rows', async () => {
      // Arrange
      const mockData = {
        data: [
          { heading: 'Valid 1', content: 'Content 1' },
          { heading: '', content: 'Content 2' }, // Invalid - no heading
          { heading: 'Valid 2', content: '' }, // Invalid - no content
          { heading: 'Valid 3', content: 'Content 3' }
        ]
      }
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      })

      // Act
      const result = await fetchSponsorData()

      // Assert
      expect(result).toHaveLength(2)
      expect(result[0].title).toBe('Valid 1')
      expect(result[1].title).toBe('Valid 3')
    })
  })

  describe('clearSponsorCache', () => {
    it('should clear cache from localStorage', () => {
      // Arrange
      localStorage.setItem('mdy_sponsor_data', 'data')
      localStorage.setItem('mdy_sponsor_data_timestamp', 'timestamp')

      // Act
      clearSponsorCache()

      // Assert
      expect(localStorage.removeItem).toHaveBeenCalledWith('mdy_sponsor_data')
      expect(localStorage.removeItem).toHaveBeenCalledWith('mdy_sponsor_data_timestamp')
    })

    it('should handle errors gracefully', () => {
      // Arrange
      localStorage.removeItem.mockImplementationOnce(() => {
        throw new Error('Storage error')
      })

      // Act & Assert
      expect(() => clearSponsorCache()).not.toThrow()
    })
  })
})
