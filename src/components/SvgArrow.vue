<template>
  <path class="SvgArrow"
    :d="path"
    :fill="color"
    :transform="`rotate(${angle})`"
  />
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';

@Component({})
export default class SvgArrow extends Vue {
  @Prop() protected x!: number;
  @Prop() protected y!: number;
  @Prop() protected color!: string;

  protected get angle() {
    const r = Math.atan2(this.x, this.y);
    const deg = -r * (360 / (Math.PI * 2)) + 90;
    return deg;
  }

  protected get length() {
    const length = Math.sqrt(this.x ** 2 + this.y ** 2);
    return length;
  }

  protected get path() {
    const width = 3;
    const triangleSize = 10;

    const { length } = this;
    const hw = width / 2;
    const ht = triangleSize / 2;

    return `
      M 0, ${-hw}
      l ${length - ht}, 0
      l 0, ${-ht + hw}
      l ${ht}, ${ht}
      l ${-ht}, ${ht}
      l 0, ${-ht + hw}
      l ${-length + ht}, 0
      l 0, ${hw}
    `;
  }
}
</script>
