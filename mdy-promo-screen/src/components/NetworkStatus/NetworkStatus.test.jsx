import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, act } from '@testing-library/react'
import NetworkStatus from './NetworkStatus'

describe('NetworkStatus', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // Reset navigator.onLine to true
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: true
    })
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('should not render when online and no notification active', () => {
    // Arrange & Act
    const { container } = render(<NetworkStatus />)

    // Assert
    expect(container.firstChild).toBeNull()
  })

  it('should render offline notification when offline', async () => {
    // Arrange
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: false
    })

    // Act
    render(<NetworkStatus />)

    // Trigger offline event
    await act(async () => {
      window.dispatchEvent(new Event('offline'))
    })

    // Assert
    await waitFor(() => {
      expect(screen.getByText('Offline - Using Cached Data')).toBeInTheDocument()
    })
  })

  it('should show online notification when coming back online', async () => {
    // Arrange
    const { container } = render(<NetworkStatus />)

    // Act - Trigger online event
    await act(async () => {
      window.dispatchEvent(new Event('online'))
    })

    // Assert
    await waitFor(() => {
      expect(screen.getByText('Back Online')).toBeInTheDocument()
    })
  })

  it('should auto-hide online notification after 3 seconds', async () => {
    // Arrange
    render(<NetworkStatus />)

    // Act - Trigger online event
    await act(async () => {
      window.dispatchEvent(new Event('online'))
    })

    // Assert - Check it's visible first
    await waitFor(() => {
      expect(screen.getByText('Back Online')).toBeInTheDocument()
    })

    // Advance timers by 3 seconds
    await act(async () => {
      vi.advanceTimersByTime(3000)
    })

    // Assert - Should be hidden
    await waitFor(() => {
      expect(screen.queryByText('Back Online')).not.toBeInTheDocument()
    })
  })

  it('should display warning icon when offline', async () => {
    // Arrange
    render(<NetworkStatus />)

    // Act
    await act(async () => {
      window.dispatchEvent(new Event('offline'))
    })

    // Assert
    await waitFor(() => {
      expect(screen.getByText('⚠')).toBeInTheDocument()
    })
  })

  it('should display checkmark icon when back online', async () => {
    // Arrange
    render(<NetworkStatus />)

    // Act
    await act(async () => {
      window.dispatchEvent(new Event('online'))
    })

    // Assert
    await waitFor(() => {
      expect(screen.getByText('✓')).toBeInTheDocument()
    })
  })

  it('should keep showing offline notification until back online', async () => {
    // Arrange
    render(<NetworkStatus />)

    // Act - Go offline
    await act(async () => {
      window.dispatchEvent(new Event('offline'))
    })

    // Wait for notification
    await waitFor(() => {
      expect(screen.getByText('Offline - Using Cached Data')).toBeInTheDocument()
    })

    // Advance time significantly
    await act(async () => {
      vi.advanceTimersByTime(60000) // 1 minute
    })

    // Assert - Should still be showing
    expect(screen.getByText('Offline - Using Cached Data')).toBeInTheDocument()
  })

  it('should cleanup event listeners on unmount', () => {
    // Arrange
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

    // Act
    const { unmount } = render(<NetworkStatus />)
    unmount()

    // Assert
    expect(removeEventListenerSpy).toHaveBeenCalledWith('online', expect.any(Function))
    expect(removeEventListenerSpy).toHaveBeenCalledWith('offline', expect.any(Function))
  })

  it('should apply correct CSS classes for offline state', async () => {
    // Arrange
    render(<NetworkStatus />)

    // Act
    await act(async () => {
      window.dispatchEvent(new Event('offline'))
    })

    // Assert
    await waitFor(() => {
      const element = document.querySelector('.network-status')
      expect(element).toHaveClass('offline')
      expect(element).not.toHaveClass('online')
    })
  })

  it('should apply correct CSS classes for online state', async () => {
    // Arrange
    render(<NetworkStatus />)

    // Act
    await act(async () => {
      window.dispatchEvent(new Event('online'))
    })

    // Assert
    await waitFor(() => {
      const element = document.querySelector('.network-status')
      expect(element).toHaveClass('online')
      expect(element).not.toHaveClass('offline')
    })
  })

  it('should handle rapid online/offline toggles', async () => {
    // Arrange
    render(<NetworkStatus />)

    // Act - Rapid toggles
    await act(async () => {
      window.dispatchEvent(new Event('offline'))
      window.dispatchEvent(new Event('online'))
      window.dispatchEvent(new Event('offline'))
    })

    // Assert - Should show offline (last state)
    await waitFor(() => {
      expect(screen.getByText('Offline - Using Cached Data')).toBeInTheDocument()
    })
  })
})
