<script setup>
import LeftContentItem from './components/LeftContentItem.vue'
</script>

<template>
  <main>
    <div class="slider">
      <LeftContentItem v-for="(item, index) in itemsToDisplay" :key="index" :imageUrl="item.imageUrl"
        :title="item.title" :html="item.html" />
    </div>
    <nav class="nav">
      <ion-icon class="btn prev" name="arrow-back-outline" @click="handleNavigation($event)"></ion-icon>
      <ion-icon class="btn next" name="arrow-forward-outline" @click="handleNavigation($event)"></ion-icon>
    </nav>
  </main>
</template>

<script>
export default {
  // inspired by -> https://codepen.io/noirsociety/pen/ZEwLGXB
  data() {
    return {
      items: [
        {
          imageUrl: '/images/2.png',
          title: 'Sponsors 8',
          html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
            'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
            'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
            'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
        },
        {
          imageUrl: '/images/1.png', // first background
          title: 'Sponsors 1',
          html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
            'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
            'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
            'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
        },
        {
          imageUrl: '/images/2.png', // 8
          title: 'The Gate Keeper 2',
          html: '<p class="description"><b>In honor</b>  Lorem ipsum, dolor sit amet consectetur' +
            'adipisicing elit. Tempore fuga voluptatum, iure corporis inventore' +
            'praesentium nisi. Id laboriosam ipsam enim. .</p>',
        },
        {
          imageUrl: '/images/3.png', // 9
          title: 'Sponsors 3',
          html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
            'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
            'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
            'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
        },
        {
          imageUrl: '/images/4.png', // etc
          title: 'Sponsors 4',
          html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
            'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
            'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
            'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
        },
        {
          imageUrl: '/images/5.png',
          title: 'Sponsors 5',
          html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
            'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
            'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
            'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
        },
        {
          imageUrl: '/images/6.png',
          title: 'Sponsors 6',
          html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
            'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
            'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
            'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
        },
        {
          imageUrl: '/images/7.png',
          title: 'Sponsors 7',
          html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
            'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
            'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
            'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
        },
        {
          imageUrl: '/images/8.png',
          title: 'Sponsors 8',
          html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
            'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
            'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
            'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
        },
        {
          imageUrl: '/images/9.png',
          title: 'Sponsors 8',
          html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
            'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
            'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
            'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
        },
        { // 0
          imageUrl: 'https://mercazdafyomi.com/wp-content/uploads/2023/11/DSC_1430-scaled.jpg',
          title: 'Sponsors 9',
          html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
            'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
            'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
            'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
        },
        { // 1
          imageUrl: 'https://mercazdafyomi.com/wp-content/uploads/2023/11/DSC_1914-scaled.jpg',
          title: 'The Gate Keeper 10',
          html: '<p class="description"><b>In honor</b>  Lorem ipsum, dolor sit amet consectetur' +
            'adipisicing elit. Tempore fuga voluptatum, iure corporis inventore' +
            'praesentium nisi. Id laboriosam ipsam enim. .</p>',
        },
        { // 2
          imageUrl: 'https://mercazdafyomi.com/wp-content/uploads/2023/11/DSC_2150-scaled.jpg',
          title: 'Sponsors 11',
          html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
            'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
            'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
            'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
        },
        { // 3
          imageUrl: 'https://mercazdafyomi.com/wp-content/uploads/2022/07/Siyum-Tannis-018-scaled.jpg',
          title: 'Sponsors 12',
          html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
            'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
            'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
            'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
        },
        { // 4
          imageUrl: '/images/1 - קידושין דף יג.png',
          title: 'Sponsors 13',
          html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
            'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
            'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
            'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
        },
        {
          imageUrl: '/images/2 - קידושין דף יג.png',
          title: 'Sponsors 14',
          html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
            'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
            'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
            'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
        },
        {
          imageUrl: '/images/3 - קידושין דף יג.png',
          title: 'Sponsors 15',
          html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
            'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
            'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
            'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
        },
        {
          imageUrl: '/images/4 - קידושין דף יג.png',
          title: 'Sponsors 16',
          html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
            'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
            'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
            'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
        },
        {
          imageUrl: '/images/5 - קידושין דף יג.png',
          title: 'Sponsors',
          html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
            'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
            'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
            'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
        },
        {
          imageUrl: '/images/6 - קידושין דף יג.png',
          title: 'Sponsors',
          html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
            'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
            'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
            'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
        },
        {
          imageUrl: '/images/7 - קידושין דף יג.png',
          title: 'Sponsors',
          html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
            'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
            'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
            'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
        },
        {
          imageUrl: '/images/8 - קידושין דף יג.png',
          title: 'Sponsors',
          html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
            'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
            'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
            'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
        },
        {
          imageUrl: '/images/9.png',
          title: 'Sponsors 8',
          html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
            'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
            'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
            'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
        },
        {
          imageUrl: '/images/8.png',
          title: 'Sponsors 8',
          html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
            'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
            'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
            'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
        },
        {
          imageUrl: '/images/7.png',
          title: 'Sponsors 8',
          html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
            'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
            'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
            'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
        },
        {
          imageUrl: '/images/6.png',
          title: 'Sponsors 8',
          html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
            'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
            'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
            'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
        },
        {
          imageUrl: '/images/5.png',
          title: 'Sponsors 8',
          html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
            'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
            'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
            'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
        },
        {
          imageUrl: '/images/4.png',
          title: 'Sponsors 8',
          html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
            'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
            'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
            'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
        },
        {
          imageUrl: '/images/3.png',
          title: 'Sponsors 8',
          html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
            'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
            'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
            'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
        }
      ],
      intervalId: null,
      counter: 0,
    };
  },
  computed: {
    itemsToDisplay() {
      return this.items.slice(0, 6);
    }
  },
  methods: {
    rotateItems() {
    },
    handleNavigation(e) {

      const slider = document.querySelector(".slider");
      const items = document.querySelectorAll(".item");
      slider.append(items[0]); // Move first item to the end

      var index = this.counter % 6;
      var oldItem = this.items[index]; // remove and push to the end
      var newItem = this.items[this.counter + 6];
      this.items[index] = newItem;
      this.items.push(oldItem);
      if (index === 5 && this.counter > 0) {
        this.items.splice(0, 6);
        this.counter = this.counter - 6 ;
      }
      this.counter++;
      console.log('counter: ' + this.counter + ', size: ' + this.items.length, ', index: ' + index);
    },
    stopAutoNavigation() {
      clearInterval(this.intervalId);
      this.intervalId = null;
    },
  },
  mounted() {


    this.intervalId = setInterval(this.handleNavigation, 3000)
  },
  beforeDestroy() {
    this.stopAutoNavigation(); // Clear interval when the component is destroyed
  },
};
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
