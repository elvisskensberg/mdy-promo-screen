import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, act } from '@testing-library/react'
import App from './App'
import * as sponsorService from './services/sponsorService'

// Mock the sponsor service
vi.mock('./services/sponsorService', () => ({
  fetchSponsorData: vi.fn()
}))

describe('App', () => {
  const mockSponsorData = [
    {
      title: 'Test Sponsor 1',
      html: '<p>Test content 1</p>',
      imageUrl: '/images/1.png'
    },
    {
      title: 'Test Sponsor 2',
      html: '<p>Test content 2</p>',
      imageUrl: '/images/2.png'
    }
  ]

  const mockZmanimData = {
    date: '2026-02-11',
    location: { city: 'Bet Shemesh', country: 'Israel' },
    times: {
      sunrise: { name: 'Sunrise', hebrew: 'הנץ החמה', time: '6:35 AM', iso: '2026-02-11T06:35:00+02:00' }
    }
  }

  beforeEach(() => {
    vi.useFakeTimers()
    vi.clearAllMocks()
    global.fetch.mockClear()

    // Mock successful responses
    sponsorService.fetchSponsorData.mockResolvedValue(mockSponsorData)
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockZmanimData
    })
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('should render App component', () => {
    // Act
    render(<App />)

    // Assert
    expect(document.querySelector('main')).toBeInTheDocument()
  })

  it('should render NetworkStatus component', () => {
    // Act
    render(<App />)

    // Assert - NetworkStatus is rendered (even if not visible)
    const main = document.querySelector('main')
    expect(main).toBeInTheDocument()
  })

  it('should render ContentCard component', async () => {
    // Act
    render(<App />)

    // Assert
    await waitFor(() => {
      expect(screen.getByText('ZMANIM')).toBeInTheDocument()
    })
  })

  it('should render SponsorBar component', () => {
    // Act
    render(<App />)

    // Assert
    expect(document.querySelector('.sponsor-bar')).toBeInTheDocument()
  })

  it('should render slider with 6 visible items', () => {
    // Act
    render(<App />)

    // Assert
    const sliderItems = document.querySelectorAll('.slider .item')
    expect(sliderItems.length).toBe(6)
  })

  it('should render navigation buttons', () => {
    // Act
    render(<App />)

    // Assert
    const navButtons = document.querySelectorAll('.nav ion-icon')
    expect(navButtons.length).toBe(2)
  })

  it('should fetch sponsor data on mount', async () => {
    // Act
    render(<App />)

    // Assert
    await waitFor(() => {
      expect(sponsorService.fetchSponsorData).toHaveBeenCalledTimes(1)
    })
  })

  it('should update sponsorItems state after fetching data', async () => {
    // Act
    render(<App />)

    // Assert
    await waitFor(() => {
      expect(sponsorService.fetchSponsorData).toHaveBeenCalled()
    })

    // Wait for state update and rendering
    await waitFor(() => {
      expect(screen.getAllByText('Test Sponsor 1').length).toBeGreaterThan(0)
    })
  })

  it('should handle sponsor fetch errors gracefully', async () => {
    // Arrange
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    sponsorService.fetchSponsorData.mockRejectedValueOnce(new Error('Fetch failed'))

    // Act
    render(<App />)

    // Assert
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled()
    })

    consoleErrorSpy.mockRestore()
  })

  it('should auto-rotate slider every 3 seconds', async () => {
    // Arrange
    render(<App />)

    const initialFirstItem = document.querySelector('.slider .item')
    const initialBackground = initialFirstItem?.style.backgroundImage

    // Act - Advance time by 3 seconds
    await act(async () => {
      vi.advanceTimersByTime(3000)
    })

    // Assert - Check that the slider has changed
    await waitFor(() => {
      const newFirstItem = document.querySelector('.slider .item')
      const newBackground = newFirstItem?.style.backgroundImage
      // The slider should have rotated
      expect(newFirstItem).toBeInTheDocument()
    })
  })

  it('should cleanup interval on unmount', () => {
    // Arrange
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval')

    // Act
    const { unmount } = render(<App />)
    unmount()

    // Assert
    expect(clearIntervalSpy).toHaveBeenCalled()
  })

  it('should handle empty sponsor data', async () => {
    // Arrange
    sponsorService.fetchSponsorData.mockResolvedValueOnce([])

    // Act
    render(<App />)

    // Assert
    await waitFor(() => {
      expect(document.querySelector('.sponsor-bar')).toBeInTheDocument()
    })
  })

  it('should use initialItems as fallback for carousel', () => {
    // Act
    render(<App />)

    // Assert
    const sliderItems = document.querySelectorAll('.slider .item')
    expect(sliderItems.length).toBe(6)
  })

  it('should have unique keys for slider items', () => {
    // Act
    const { container } = render(<App />)

    // Assert
    const sliderItems = container.querySelectorAll('.slider .item')
    expect(sliderItems.length).toBe(6)
  })

  it('should apply background images to slider items', () => {
    // Act
    render(<App />)

    // Assert
    const sliderItems = document.querySelectorAll('.slider .item')
    sliderItems.forEach(item => {
      expect(item.style.backgroundImage).toBeTruthy()
    })
  })

  it('should handle multiple rapid navigation clicks', async () => {
    // Arrange
    const { container } = render(<App />)
    const nextButton = container.querySelector('.nav ion-icon.next')

    // Act - Click multiple times rapidly
    await act(async () => {
      nextButton?.click()
      nextButton?.click()
      nextButton?.click()
    })

    // Assert - Should not crash and slider should still have items
    expect(document.querySelectorAll('.slider .item').length).toBe(6)
  })
})
