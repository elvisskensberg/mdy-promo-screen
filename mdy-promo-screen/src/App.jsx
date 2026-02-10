import React, { useState, useEffect, useRef } from 'react'
import ContentCard from './components/ContentCard'
import SponsorBar from './components/SponsorBar'

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

const initialItems = [
  {
    imageUrl: 'https://mercazdafyomi.com/wp-content/uploads/2023/11/DSC_1430-scaled.jpg',
    title: 'Sponsors 1',
    html: '<p class="description"><b>Kidnovations LLC:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
      'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
      'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
      'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
  },
  {
    imageUrl: '/images/1.png',
    title: 'Sponsors 2',
    html: '<p class="description"><b>Kidnovations LLC:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
      'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
      'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
      'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
  },
  {
    imageUrl: 'https://mercazdafyomi.com/wp-content/uploads/2023/11/DSC_1914-scaled.jpg',
    title: 'The Gate Keeper',
    html: '<p class="description"><b>In honor</b> of our community and supporters who make this possible.</p>',
  },
  {
    imageUrl: '/images/1 - קידושין דף יג.png',
    title: 'Sponsors 3',
    html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
      'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
      'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
      'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
  },
  {
    imageUrl: '/images/2 - קידושין דף יג.png',
    title: 'Sponsors 4',
    html: '<p class="description"><b>Kidnovations LLC:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
      'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
      'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
      'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
  },
  {
    imageUrl: '/images/3 - קידושין דף יג.png',
    title: 'Sponsors 5',
    html: '<p class="description"><b>Kidnovations LLC:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
      'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
      'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
      'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
  },
  {
    imageUrl: '/images/4 - קידושין דף יג.png',
    title: 'Sponsors 6',
    html: '<p class="description"><b>Kidnovations LLC:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
      'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
      'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
      'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
  },
  {
    imageUrl: '/images/5 - קידושין דף יג.png',
    title: 'Sponsors 7',
    html: '<p class="description"><b>Kidnovations LLC:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
      'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
      'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
      'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
  },
  {
    imageUrl: '/images/6 - קידושין דף יג.png',
    title: 'Sponsors 8',
    html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
      'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
      'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
      'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
  },
  {
    imageUrl: '/images/7 - קידושין דף יג.png',
    title: 'Sponsors 9',
    html: '<p class="description"><b>Kidnovations LLC:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
      'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
      'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
      'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
  },
  {
    imageUrl: '/images/8 - קידושין דף יג.png',
    title: 'Sponsors 10',
    html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
      'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
      'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
      'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
  },
  {
    imageUrl: 'https://mercazdafyomi.com/wp-content/uploads/2023/11/DSC_1914-scaled.jpg',
    title: 'Sponsors 11',
    html: '<p class="description"><b>In honor</b> of our community and supporters.</p>',
  },
  {
    imageUrl: 'https://mercazdafyomi.com/wp-content/uploads/2023/11/DSC_2150-scaled.jpg',
    title: 'Sponsors 12',
    html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
      'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
      'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
      'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
  },
  {
    imageUrl: 'https://mercazdafyomi.com/wp-content/uploads/2022/07/Siyum-Tannis-018-scaled.jpg',
    title: 'Sponsors 13',
    html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
      'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
      'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
      'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
  },
  // Cycle through the images again for more slides
  {
    imageUrl: '/images/1.png',
    title: 'Sponsors 14',
    html: '<p class="description"><b>Kidnovations LLC:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
      'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
      'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
      'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
  },
  {
    imageUrl: 'https://mercazdafyomi.com/wp-content/uploads/2023/11/DSC_1430-scaled.jpg',
    title: 'Sponsors 15',
    html: '<p class="description"><b>In honor</b> of our community and supporters.</p>',
  },
  {
    imageUrl: '/images/1 - קידושין דף יג.png',
    title: 'Sponsors 16',
    html: '<p class="description"><b>Kidnovations LLC:</b> Supporting Torah study worldwide.</p>',
  },
  {
    imageUrl: '/images/2 - קידושין דף יג.png',
    title: 'Sponsors 17',
    html: '<p class="description"><b>Kidnovations LLC:</b> Supporting Torah study worldwide.</p>',
  },
  {
    imageUrl: '/images/3 - קידושין דף יג.png',
    title: 'Sponsors 18',
    html: '<p class="description"><b>Kidnovations LLC:</b> Supporting Torah study worldwide.</p>',
  },
  {
    imageUrl: '/images/4 - קידושין דף יג.png',
    title: 'Sponsors 19',
    html: '<p class="description"><b>Kidnovations LLC:</b> Supporting Torah study worldwide.</p>',
  },
  {
    imageUrl: '/images/5 - קידושין דף יג.png',
    title: 'Sponsors 20',
    html: '<p class="description"><b>Kidnovations LLC:</b> Supporting Torah study worldwide.</p>',
  },
  {
    imageUrl: '/images/6 - קידושין דף יג.png',
    title: 'Sponsors 21',
    html: '<p class="description"><b>Kidnovations LLC:</b> Supporting Torah study worldwide.</p>',
  },
  {
    imageUrl: '/images/7 - קידושין דף יג.png',
    title: 'Sponsors 22',
    html: '<p class="description"><b>Kidnovations LLC:</b> Supporting Torah study worldwide.</p>',
  },
  {
    imageUrl: '/images/8 - קידושין דף יג.png',
    title: 'Sponsors 23',
    html: '<p class="description"><b>Kidnovations LLC:</b> Supporting Torah study worldwide.</p>',
  },
  {
    imageUrl: 'https://mercazdafyomi.com/wp-content/uploads/2023/11/DSC_1914-scaled.jpg',
    title: 'Sponsors 24',
    html: '<p class="description"><b>In honor</b> of our community and supporters.</p>',
  },
  {
    imageUrl: 'https://mercazdafyomi.com/wp-content/uploads/2023/11/DSC_2150-scaled.jpg',
    title: 'Sponsors 25',
    html: '<p class="description"><b>In honor</b> of our community and supporters.</p>',
  },
  {
    imageUrl: 'https://mercazdafyomi.com/wp-content/uploads/2022/07/Siyum-Tannis-018-scaled.jpg',
    title: 'Sponsors 26',
    html: '<p class="description"><b>In honor</b> of our community and supporters.</p>',
  },
  {
    imageUrl: '/images/1.png',
    title: 'Sponsors 27',
    html: '<p class="description"><b>Kidnovations LLC:</b> Supporting Torah study worldwide.</p>',
  },
  {
    imageUrl: '/images/1 - קידושין דף יג.png',
    title: 'Sponsors 28',
    html: '<p class="description"><b>Kidnovations LLC:</b> Supporting Torah study worldwide.</p>',
  }
]

function App() {
  const [items, setItems] = useState([...initialItems])
  const [counter, setCounter] = useState(0)
  const sliderRef = useRef(null)

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
      <ContentCard />
      <SponsorBar items={initialItems} />
      <div className="slider" ref={sliderRef}>
        {itemsToDisplay.map((item, index) => (
          <SliderItem
            key={index}
            imageUrl={item.imageUrl}
          />
        ))}
      </div>
      <nav className="nav">
        <ion-icon className="btn prev" name="arrow-back-outline" onClick={handleNavigation}></ion-icon>
        <ion-icon className="btn next" name="arrow-forward-outline" onClick={handleNavigation}></ion-icon>
      </nav>
    </main>
  )
}

export default App
