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
.container {
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
}
</style>
