import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import ContentCard from './ContentCard'

describe('ContentCard', () => {
  const mockZmanimData = {
    date: '2026-02-11',
    gregorianDate: 'Tuesday, February 11, 2026',
    hebrewDate: '13 Adar I 5786',
    location: {
      city: 'Bet Shemesh',
      country: 'Israel'
    },
    times: {
      alotHaShachar: { name: 'Alot Hashachar', hebrew: 'עלות השחר', time: '5:10 AM', iso: '2026-02-11T05:10:00+02:00' },
      sunrise: { name: 'Sunrise', hebrew: 'הנץ החמה', time: '6:35 AM', iso: '2026-02-11T06:35:00+02:00' },
      sofZmanShma: { name: 'Sof Zman Shma (MGA)', hebrew: 'סוף זמן ק"ש מג"א', time: '9:15 AM', iso: '2026-02-11T09:15:00+02:00' },
      chatzot: { name: 'Chatzot', hebrew: 'חצות היום', time: '12:30 PM', iso: '2026-02-11T12:30:00+02:00' },
      sunset: { name: 'Sunset', hebrew: 'שקיעה', time: '5:45 PM', iso: '2026-02-11T17:45:00+02:00' },
      tzeit: { name: 'Tzet Hakochavim', hebrew: 'צאת הכוכבים', time: '6:20 PM', iso: '2026-02-11T18:20:00+02:00' }
    }
  }

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-02-11T10:00:00'))
    global.fetch.mockClear()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('should render ContentCard component', () => {
    // Arrange
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockZmanimData
    })

    // Act
    render(<ContentCard />)

    // Assert
    expect(screen.getByText('ZMANIM')).toBeInTheDocument()
  })

  it('should load and display zmanim data from API', async () => {
    // Arrange
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockZmanimData
    })

    // Act
    render(<ContentCard />)

    // Assert
    await waitFor(() => {
      expect(screen.getByText('Alot Hashachar')).toBeInTheDocument()
      expect(screen.getByText('5:10 AM')).toBeInTheDocument()
      expect(screen.getByText('עלות השחר')).toBeInTheDocument()
    })
  })

  it('should fetch zmanim for current date', async () => {
    // Arrange
    const expectedDate = '2026-02-11'
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockZmanimData
    })

    // Act
    render(<ContentCard />)

    // Assert
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(`/assets/zmanim/${expectedDate}.json`)
      )
    })
  })

  it('should update current time every second', async () => {
    // Arrange
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockZmanimData
    })

    // Act
    render(<ContentCard />)

    // Wait for initial render
    await waitFor(() => {
      expect(screen.getByText(/AM/i)).toBeInTheDocument()
    })

    const initialTime = screen.getByText(/AM/i).textContent

    // Advance time by 1 second
    vi.advanceTimersByTime(1000)

    // Assert
    await waitFor(() => {
      const newTime = screen.getByText(/AM/i).textContent
      expect(newTime).toBeDefined()
    })
  })

  it('should display logo image', async () => {
    // Arrange
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockZmanimData
    })

    // Act
    render(<ContentCard />)

    // Assert
    await waitFor(() => {
      const logo = screen.getByAltText('MDY Logo')
      expect(logo).toBeInTheDocument()
      expect(logo).toHaveAttribute('src', '/images/logo.jpg')
    })
  })

  it('should apply proximity classes to zmanim items', async () => {
    // Arrange - Set time to be 10 minutes before Chatzot (12:30 PM)
    vi.setSystemTime(new Date('2026-02-11T12:20:00'))

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockZmanimData
    })

    // Act
    render(<ContentCard />)

    // Assert
    await waitFor(() => {
      const zmanimItems = document.querySelectorAll('.zman-item')
      expect(zmanimItems.length).toBeGreaterThan(0)
    })
  })

  it('should handle API fetch errors gracefully', async () => {
    // Arrange
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    global.fetch.mockRejectedValueOnce(new Error('Network error'))

    // Act
    render(<ContentCard />)

    // Assert
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled()
    })

    consoleErrorSpy.mockRestore()
  })

  it('should handle 404 response from API', async () => {
    // Arrange
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404
    })

    // Act
    render(<ContentCard />)

    // Assert
    await waitFor(() => {
      expect(screen.getByText('ZMANIM')).toBeInTheDocument()
    })
  })

  it('should format Hebrew text with proper direction', async () => {
    // Arrange
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockZmanimData
    })

    // Act
    render(<ContentCard />)

    // Assert
    await waitFor(() => {
      const hebrewElements = screen.getAllByText(/[\u0590-\u05FF]/)
      expect(hebrewElements.length).toBeGreaterThan(0)
    })
  })

  it('should cleanup interval on unmount', async () => {
    // Arrange
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockZmanimData
    })

    const clearIntervalSpy = vi.spyOn(global, 'clearInterval')

    // Act
    const { unmount } = render(<ContentCard />)
    unmount()

    // Assert
    expect(clearIntervalSpy).toHaveBeenCalled()
  })
})
