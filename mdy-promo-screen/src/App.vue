<script setup>
import Zmanim from './components/Zmanim.vue'
import LeftContentItem from './components/LeftContentItem.vue'
const items = [
  {
    imageUrl: 'https://mercazdafyomi.com/wp-content/uploads/2023/11/DSC_1430-scaled.jpg',
    title: 'Sponsors',
    html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
      'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
      'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
      'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
  },
  {
    imageUrl: 'https://mercazdafyomi.com/wp-content/uploads/2023/11/DSC_1914-scaled.jpg',
    title: 'The Gate Keeper',
    html: '<p class="description"><b>In honor</b>  Lorem ipsum, dolor sit amet consectetur' +
            'adipisicing elit. Tempore fuga voluptatum, iure corporis inventore' +
            'praesentium nisi. Id laboriosam ipsam enim. .</p>',
  },
  {
    imageUrl: 'https://mercazdafyomi.com/wp-content/uploads/2023/11/DSC_2150-scaled.jpg',
    title: 'Sponsors',
    html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
      'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
      'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
      'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
  },
  {
    imageUrl: 'https://mercazdafyomi.com/wp-content/uploads/2022/07/Siyum-Tannis-018-scaled.jpg',
    title: 'Sponsors',
    html: '<p class="description"><b>Kidnovations LLC2:</b> In honor of my Uncle Reb Elchanan Pressman and Fishel. ' +
      'It should be a zechus for Akiva Simcha Ben Fayga, a shidduch for רבקה יהודית בת יפה חיה and a THANK YOU to ' +
      'Rebbitzen Stefansky for selflessly giving up her husband for the klal. ​It should be a zechus for a year ' +
      'filled with Mazel, Bracha, hatzlacha, Parnassa B\'revach and Refuah.</p>',
  },
];
</script>

<template>
  <main>
    <div class="slider">


      <LeftContentItem v-for="(item, index) in items" :key="index" :imageUrl="item.imageUrl" :title="item.title"
        :html="item.html" />
      
    </div>
    <nav class='nav'>
      <ion-icon class='btn prev' name="arrow-back-outline"></ion-icon>
      <ion-icon class='btn next' name="arrow-forward-outline"></ion-icon>
    </nav>
  </main>
</template>

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
