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
    <div v-if="isVideo">
      <video :src="imageUrl" controls autoplay muted loop loading="eager" class="media" alt="Video">
        Your browser does not support the video tag.
      </video>
    </div>
    <div v-else>
      <img :src="imageUrl" loading="eager" alt="Nobis Omnis" class="image" />
    </div>
    <div class="content">
      <h2 class="title">{{ title }}</h2>
      <div v-html="html"></div>
    </div>
    <Zmanim />
  </div>
</template>


<script>
export default {
  computed: {
    // Check if the URL ends with .mp4
    isVideo() {
      return this.imageUrl.endsWith('.mp4');
    },
  },
};
</script>
