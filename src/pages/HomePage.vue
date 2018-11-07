<template>
  <div class="HomePage">
    <h1>{{ sMatrix }}</h1>
    <SvgGraph
      :draggingMatrix="draggingMatrix"
      :matrix="matrix"
      :onUpdate="graph_onUpdate"
      :posOrigin="{ x: 100, y: 100 }"
    />
    <p>
      Image from <a href="https://www.e-hon.ne.jp/bec/SA/Detail?refShinCode=0100000000000007245581&Action_id=121&Sza_id=C0">賢い犬リリエンタール 4（葦原大介）</a>
      (<a href="https://www.amazon.co.jp/dp/B00B45DJUI/">Kindle</a>)
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IPos, IMatrix, getMatrixStr } from '@/misc';
import SvgGraph from '@/components/SvgGraph.vue';

@Component({
  components: {
    SvgGraph,
  },
})
export default class App extends Vue {
  protected matrix: IMatrix = {
    ix: 1,
    iy: 0,
    jx: 0,
    jy: 1,
    tx: 0,
    ty: 0,
  };
  protected draggingMatrix: IMatrix = {
    ix: 0,
    iy: 0,
    jx: 0,
    jy: 0,
    tx: 0,
    ty: 0,
  };

  get sMatrix() {
    return getMatrixStr(this.matrix, this.draggingMatrix);
  }

  public graph_onUpdate(m: IMatrix, dm: IMatrix) {
    Object.assign(this.matrix, m);
    Object.assign(this.draggingMatrix, dm);
  }
}
</script>

<style scoped>
/* .HomePage {
} */
</style>
