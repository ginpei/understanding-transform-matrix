<template>
  <g class="SvgTarget"
    :style="{ transform: sMatrix }"
  >
    <image class="SvgTarget-image" href="/image.png"
      :width="100"
      :height="100"
    />
  </g>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
import { IMatrix, getMatrixStr, mergeMatrix } from '@/misc';

@Component({
  components: {
  },
})
export default class App extends Vue {
  @Prop() protected matrix!: IMatrix;
  @Prop() protected draggingMatrix!: IMatrix;

  protected get sMatrix() {
    return getMatrixStr(mergeMatrix(this.matrix, this.draggingMatrix));
  }
}
</script>

<style scoped>
.SvgTarget-image {
  pointer-events: none;
}
</style>
