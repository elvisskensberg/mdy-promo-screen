import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

// inspired by -> https://codepen.io/noirsociety/pen/ZEwLGXB

// modified animation to keep it centered on the viewport
// modified animation timing
// no background images
// added stagger

// simple js i ever seen :)

const slider = document.querySelector(".slider");

function activate(e) {
  const items = document.querySelectorAll(".item");
  e.target.matches(".next") && slider.append(items[0]);
  e.target.matches(".prev") && slider.prepend(items[items.length - 1]);
}

document.addEventListener("click", activate, false);