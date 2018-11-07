<template>
  <g>
    <line
      v-for="v in hLines"
      :key="v.i"
      :x1="v.x1"
      :y1="v.y1"
      :x2="v.x2"
      :y2="v.y2"
    />
    <line
      v-for="v in vLines"
      :key="v.i"
      :x1="v.x1"
      :y1="v.y1"
      :x2="v.x2"
      :y2="v.y2"
    />
    <line class="-origin" x1="0" y1="100" x2="300" y2="100" />
    <line class="-origin" x1="100" y1="0" x2="100" y2="300" />
  </g>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
})
export default class App extends Vue {
  protected width = 300;
  protected height = 300;
  protected length = 10;

  protected hLines = [...Array(this.height / this.length)].map((_, i) => ({
    i: `h-${i}`,
    x1: 0,
    y1: i * this.length,
    x2: this.width,
    y2: i * this.length,
  }));

  protected vLines = [...Array(this.width / this.length)].map((_, i) => ({
    i: `v-${i}`,
    x1: i * this.length,
    y1: 0,
    x2: i * this.length,
    y2: this.height,
  }));
}
</script>

<style scoped>
line {
  stroke: #f0f0f0;
  stroke-width: 1px;
}
line.-origin {
  stroke: #333;
}
line.-primary {
  stroke: #ccc;
}
</style>
