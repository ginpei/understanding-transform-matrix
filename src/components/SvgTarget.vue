<template>
  <g class="SvgTarget"
    :style="{ transform: sMatrix }"
  >
    <image class="SvgTarget-image" xlink:href="/image.png"
      :width="100"
      :height="100"
    />
  </g>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
import { IMatrix, getMatrixStr } from '@/misc';

@Component({
  components: {
  },
})
export default class SvgTarget extends Vue {
  @Prop() protected matrix!: IMatrix;

  protected get sMatrix() {
    return getMatrixStr(this.matrix);
  }
}
</script>

<style>
.SvgTarget-image {
  pointer-events: none;
}
</style>
