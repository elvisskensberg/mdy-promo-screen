import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SponsorBar from './SponsorBar'

describe('SponsorBar', () => {
  const mockItems = [
    {
      title: 'Sponsor 1',
      html: '<p><b>Company A:</b> Supporting Torah study</p>',
      imageUrl: '/images/1.png'
    },
    {
      title: 'Sponsor 2',
      html: '<p><b>Company B:</b> In honor of the community</p>',
      imageUrl: '/images/2.png'
    }
  ]

  it('should render SponsorBar component', () => {
    // Act
    render(<SponsorBar items={mockItems} />)

    // Assert
    expect(document.querySelector('.sponsor-bar')).toBeInTheDocument()
  })

  it('should display sponsor titles', () => {
    // Act
    render(<SponsorBar items={mockItems} />)

    // Assert
    expect(screen.getAllByText('Sponsor 1').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Sponsor 2').length).toBeGreaterThan(0)
  })

  it('should strip HTML tags from content', () => {
    // Act
    render(<SponsorBar items={mockItems} />)

    // Assert
    expect(screen.getAllByText(/Company A: Supporting Torah study/).length).toBeGreaterThan(0)
    expect(screen.queryByText(/<p>/)).not.toBeInTheDocument()
  })

  it('should render duplicate content for continuous scrolling', () => {
    // Act
    render(<SponsorBar items={mockItems} />)

    // Assert
    const sponsor1Elements = screen.getAllByText('Sponsor 1')
    expect(sponsor1Elements.length).toBe(2) // Should appear twice for continuous scroll
  })

  it('should handle empty items array', () => {
    // Act
    render(<SponsorBar items={[]} />)

    // Assert
    expect(document.querySelector('.sponsor-bar')).toBeInTheDocument()
    expect(document.querySelector('.sponsor-content')).toBeInTheDocument()
  })

  it('should handle single item', () => {
    // Arrange
    const singleItem = [mockItems[0]]

    // Act
    render(<SponsorBar items={singleItem} />)

    // Assert
    expect(screen.getAllByText('Sponsor 1').length).toBeGreaterThan(0)
  })

  it('should apply sponsor-title class to titles', () => {
    // Act
    render(<SponsorBar items={mockItems} />)

    // Assert
    const titleElements = document.querySelectorAll('.sponsor-title')
    expect(titleElements.length).toBeGreaterThan(0)
  })

  it('should apply sponsor-text class to content', () => {
    // Act
    render(<SponsorBar items={mockItems} />)

    // Assert
    const textElements = document.querySelectorAll('.sponsor-text')
    expect(textElements.length).toBeGreaterThan(0)
  })

  it('should render without separators', () => {
    // Act
    render(<SponsorBar items={mockItems} />)

    // Assert
    expect(document.querySelector('.sponsor-separator')).not.toBeInTheDocument()
  })

  it('should handle HTML entities correctly', () => {
    // Arrange
    const itemsWithEntities = [{
      title: 'Test & Co',
      html: '<p>Content with &amp; and &quot;quotes&quot;</p>',
      imageUrl: '/images/1.png'
    }]

    // Act
    render(<SponsorBar items={itemsWithEntities} />)

    // Assert
    expect(screen.getAllByText('Test & Co').length).toBeGreaterThan(0)
  })

  it('should handle long content', () => {
    // Arrange
    const longContent = 'Lorem ipsum '.repeat(50)
    const itemsWithLongContent = [{
      title: 'Long Sponsor',
      html: `<p>${longContent}</p>`,
      imageUrl: '/images/1.png'
    }]

    // Act
    render(<SponsorBar items={itemsWithLongContent} />)

    // Assert
    expect(document.querySelector('.sponsor-text')).toBeInTheDocument()
  })

  it('should normalize whitespace in stripped HTML', () => {
    // Arrange
    const itemsWithWhitespace = [{
      title: 'Sponsor',
      html: '<p>Multiple    spaces    and\n\nnewlines</p>',
      imageUrl: '/images/1.png'
    }]

    // Act
    render(<SponsorBar items={itemsWithWhitespace} />)

    // Assert
    const textContent = screen.getAllByText(/Multiple spaces and newlines/)[0]
    expect(textContent).toBeInTheDocument()
  })
})
