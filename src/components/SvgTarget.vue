<template>
  <g class="SvgTarget"
    :style="{ transform: sMatrix }"
  >
    <image class="SvgTarget-image" href="/image.png"
      :width="100"
      :height="100"
    />
    <SvgArrow />
    <SvgArrow style="transform: rotate(90deg);"/>
  </g>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
import SvgArrow from './SvgArrow.vue';
import { IMatrix, getMatrixStr } from '@/misc';

@Component({
  components: {
    SvgArrow,
  },
})
export default class App extends Vue {
  @Prop() protected matrix!: IMatrix;
  @Prop() protected draggingMatrix!: IMatrix;

  protected get sMatrix() {
    return getMatrixStr(this.matrix, this.draggingMatrix);
  }
}
</script>

<style scoped>
.SvgTarget-image {
  pointer-events: none;
}
</style>
