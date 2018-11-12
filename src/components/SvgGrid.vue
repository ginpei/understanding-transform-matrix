<template>
  <g class="SvgGrid">
    <line class="SvgGrid-line"
      v-for="v in hLines"
      :key="`h-${v.y1}`"
      :x1="v.x1"
      :y1="v.y1"
      :x2="v.x2"
      :y2="v.y2"
    />
    <line class="SvgGrid-line"
      v-for="v in vLines"
      :key="`v-${v.x1}`"
      :x1="v.x1"
      :y1="v.y1"
      :x2="v.x2"
      :y2="v.y2"
    />
    <line class="SvgGrid-origin"
      :x1="0"
      :y1="posOrigin.y"
      :x2="width"
      :y2="posOrigin.y"
    />
    <line class="SvgGrid-origin"
      :x1="posOrigin.x"
      :y1="0"
      :x2="posOrigin.x"
      :y2="height"
    />
  </g>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
import { IPos } from '@/misc';

@Component({})
export default class SvgGrid extends Vue {
  @Prop() protected width!: number;
  @Prop() protected height!: number;
  @Prop() protected posOrigin!: IPos;
  @Prop() protected interval!: number;

  protected get hLines() {
    const length = Math.ceil(this.height / this.interval);
    const offset = this.posOrigin.y % this.interval +
      (this.posOrigin.y > 0 ? 0 : this.interval);
    return [...Array(length)].map((_, i) => ({
      x1: 0,
      y1: offset + i * this.interval,
      x2: this.width,
      y2: offset + i * this.interval,
    }));
  }

  protected get vLines() {
    const length = Math.ceil(this.width / this.interval);
    const offset = this.posOrigin.x % this.interval +
      (this.posOrigin.x > 0 ? 0 : this.interval);
    return [...Array(length)].map((_, i) => ({
      x1: offset + i * this.interval,
      y1: 0,
      x2: offset + i * this.interval,
      y2: this.height,
    }));
  }
}
</script>

<style>
.SvgGrid-origin {
  stroke: #333;
}
.SvgGrid-line {
  stroke: #ccc;
  stroke-width: 1px;
}
</style>
