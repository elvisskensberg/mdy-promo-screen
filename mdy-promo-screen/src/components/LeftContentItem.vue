<script setup>
import Zmanim from './Zmanim.vue';

defineProps({
  imageUrl: {
    type: String,
    required: true, // The prop must be provided
  },
  title: {
    type: String,
    required: true,
  },
  html: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="item">
    <img 
      :src="imageUrl" 
      loading="eager" 
      alt="Nobis Omnis" 
      class="image" 
    />
    <div class="content">
      <h2 class="title">{{ title }}</h2>
      <div v-html="html"></div>
    </div>
    <Zmanim />
  </div>
</template>
