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
import { IMatrix, getMatrixStr } from '@/misc';

@Component({
  components: {
  },
})
export default class App extends Vue {
  @Prop() protected matrix!: IMatrix;

  protected get sMatrix() {
    return getMatrixStr(this.matrix);
  }
}
</script>

<style scoped>
.SvgTarget-image {
  pointer-events: none;
}
</style>
