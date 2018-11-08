<template>
  <div class="HomePage container">
    <GHeader title="Understanding transform: matrix()"
      :headerLinks="[
        {
          title: 'Code',
          items: [
            {
              title: 'GitHub',
              href: 'https://github.com/ginpei/understanding-transform-matrix',
            },
          ],
        },
      ]"
    />
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
        <MatrixCode
          :matrix="mergedMatrix"
        />
        <div>
          <div class="HomePage-position"
            :style="{ color: colors.i }"
          >Vector <var>i</var> ({{ ix }}, {{ iy }})</div>
          <div class="HomePage-position"
            :style="{ color: colors.j }"
          >Vector <var>j</var> ({{ jx }}, {{ jy }})</div>
          <div class="HomePage-position"
            :style="{ color: colors.transition }"
          >Transition ({{ tx }}, {{ ty }})</div>
        </div>
        <p>
          Presets:
          <button @click="initial_onClick">Initial</button>
          <button @click="rotate_onClick">Rotate 30°</button>
          <button @click="flip_onClick">Flip horizontally</button>
        </p>
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
import { IPos, IMatrix, getMatrixStr, mergeMatrix, roundMatrix, colors } from '@/misc';
import SvgGraph from '@/components/SvgGraph.vue';
import MatrixCode from '@/components/MatrixCode.vue';
import GHeader from '@/components/GHeader.vue';

@Component({
  components: {
    SvgGraph,
    MatrixCode,
    GHeader,
  },
})
export default class App extends Vue {
  public colors = colors;

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

  public initial_onClick() {
    Object.assign(this.matrix, {
      ix: 1, iy: 0,
      jx: 0, jy: 1,
      tx: 0, ty: 0,
    });
  }

  public rotate_onClick() {
    Object.assign(this.matrix, {
      ix: this.cos(30), iy: this.sin(30),
      jx: this.cos(90 + 30), jy: this.sin(90 + 30),
      tx: 0, ty: 0,
    });
  }

  public flip_onClick() {
    Object.assign(this.matrix, {
      ix: -1, iy: 0,
      jx: 0, jy: 1,
      tx: 100, ty: 0,
    });
  }

  protected cos(deg: number) {
    return Math.cos(deg / 360 * Math.PI * 2);
  }

  protected sin(deg: number) {
    return Math.sin(deg / 360 * Math.PI * 2);
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
.HomePage-position {
  font-weight: bold;
}
</style>
