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
  --color-xxx-1: #09c9;
  --color-link: #00f;
}

body {
  font-family: "Helvetica", "Arial", "Yu Gothic", sans-serif;
}
:link {
  color: var(--color-link);
}

.btn-link {
  color: var(--color-link);
  cursor: pointer;
  text-decoration: underline;
}

.color-vector-i {
  color: red;
}
.color-vector-j {
  color: blue;
}
.color-translation {
  color: green;
}
</style>
