import React, { useState, useEffect, useRef } from 'react'
import ContentCard from './components/ContentCard'
import SponsorBar from './components/SponsorBar'
import NetworkStatus from './components/NetworkStatus'
import { fetchSponsorData } from './services/sponsorService'

const SliderItem = ({ imageUrl }) => {
  // Remove quotes from url() - they can cause issues
  const backgroundStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat'
  }

  return (
    <div className="item" style={backgroundStyle}></div>
  )
}

// Generate initialItems with numbered images 1-20
const initialItems = Array.from({ length: 20 }, (_, index) => {
  const pageNumber = index + 1
  return {
    imageUrl: `/images/numbered/${pageNumber}.png`,
    title: `Page ${pageNumber}`,
    html: `<p class="description"><b>Slide ${pageNumber}:</b> Generated numbered image with random background color.</p>`
  }
})

function App() {
  const [items, setItems] = useState([...initialItems])
  const [sponsorItems, setSponsorItems] = useState(initialItems)
  const [counter, setCounter] = useState(0)
  const sliderRef = useRef(null)

  // Fetch sponsor data from Google Sheets on mount
  useEffect(() => {
    const loadSponsorData = async () => {
      try {
        const data = await fetchSponsorData()
        if (data && data.length > 0) {
          setSponsorItems(data)
        }
      } catch (error) {
        console.error('Failed to load sponsor data:', error)
      }
    }
    loadSponsorData()
  }, [])

  const handleNavigation = () => {
    const slider = sliderRef.current
    if (!slider) return

    const itemElements = slider.querySelectorAll('.item')
    if (itemElements.length > 0) {
      slider.append(itemElements[0])
    }

    setItems(prevItems => {
      const newItems = [...prevItems]
      const index = counter % 6
      const oldItem = newItems[index]
      const newItem = newItems[counter + 6]

      if (newItem) {
        newItems[index] = newItem
        newItems.push(oldItem)
      }

      if (index === 5 && counter > 0) {
        newItems.splice(0, 6)
        setCounter(prevCounter => prevCounter - 6)
      }

      return newItems
    })

    setCounter(prevCounter => prevCounter + 1)
  }

  useEffect(() => {
    const intervalId = setInterval(handleNavigation, 3000)

    return () => {
      clearInterval(intervalId)
    }
  }, [counter])

  const itemsToDisplay = items.slice(0, 6)

  return (
    <main>
      <NetworkStatus />
      <ContentCard />
      <SponsorBar items={sponsorItems} />
      <div className="slider" ref={sliderRef}>
        {itemsToDisplay.map((item, index) => (
          <SliderItem
            key={index}
            imageUrl={item.imageUrl}
          />
        ))}
      </div>
    </main>
  )
}

export default App
