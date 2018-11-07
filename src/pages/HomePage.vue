<template>
  <div class="HomePage container">
    <h1>Understanding <code>transform: matrix()</code></h1>
    <div class="HomePage-frameX">
      <div class="HomePage-graphBlock">
        <SvgGraph
          :draggingMatrix="draggingMatrix"
          :matrix="matrix"
          :onUpdate="graph_onUpdate"
          :posOrigin="{ x: 100, y: 100 }"
        />
      </div>
      <div class="HomePage-dataBlock">
        <pre><code>.the-target {
  transform: {{ sMatrix }};
}</code></pre>
        <p>
          Vector <code>i</code> ({{ ix }}, {{ iy }})<br/>
          Vector <code>j</code> ({{ jx }}, {{ jy }})<br/>
          Transition ({{ tx }}, {{ ty }})<br/>
        </p>
        <p></p>
      </div>
    </div>
    <p>
      Image from <a href="https://www.e-hon.ne.jp/bec/SA/Detail?refShinCode=0100000000000007245581&Action_id=121&Sza_id=C0">賢い犬リリエンタール 4（葦原大介）</a>
      (<a href="https://www.amazon.co.jp/dp/B00B45DJUI/">Kindle</a>)
    </p>
    <p>
      Recommend to read:
      <a href="http://www.ajimatics.com/entry/2018/10/31/060000">線形代数の知識ゼロから始めて行列式「だけ」理解する - アジマティクス</a>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IPos, IMatrix, getMatrixStr, mergeMatrix, roundMatrix } from '@/misc';
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

  protected get mergedMatrix() {
    return roundMatrix(mergeMatrix(this.matrix, this.draggingMatrix));
  }

  // vector i
  protected get ix() { return this.mergedMatrix.ix; }
  protected get iy() { return this.mergedMatrix.iy; }

  // vector j
  protected get jx() { return this.mergedMatrix.jx; }
  protected get jy() { return this.mergedMatrix.jy; }

  // vector t
  protected get tx() { return this.mergedMatrix.tx; }
  protected get ty() { return this.mergedMatrix.ty; }

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
.HomePage-frameX {
  display: flex;
  flex-direction: row;
}
.HomePage-graphBlock {
  text-align: center;
  flex: 1;
}
.HomePage-dataBlock {
  flex: 1;
}
</style>
