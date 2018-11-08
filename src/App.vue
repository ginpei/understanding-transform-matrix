<template>
  <div id="app">
    <HomePage />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HomePage from '@/pages/HomePage.vue';

@Component({
  components: {
    HomePage,
  },
})
export default class App extends Vue {
}
</script>

<style>
:root {
  --GHeader-height: 1.2rem;
  --GHeader-color-bg: #036;
  --GHeader-color-fg: snow;
  --GHeader-color-border: silver;
}

body {
  font-family: "Helvetica", "Arial", "Yu Gothic", sans-serif;
}

.container {
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
}
</style>
