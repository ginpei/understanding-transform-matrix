<template>
  <div class="HomePage container">
    <GHeader ref="header" title="Understanding transform:matrix()"
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
    <SvgGraph
      :width="graphWidth"
      :height="graphHeight"
      :positionTop="graphTop"
      :matrix="mergedMatrix"
      :onMove="graph_onMove"
      :onEnd="graph_onEnd"
      :onOriginMove="graph_onOriginMove"
      :onOriginMoveEnd="graph_onOriginMoveEnd"
      :posOrigin="mergedOrigin"
    />
    <div class="HomePage-controlPanel">
      <p>
        Presets:
        <button @click="initial_onClick">Initial</button>
        <button @click="rotate_onClick">Rotate 30°</button>
        <button @click="flip_onClick">Flip horizontally</button>
      </p>
      <MatrixCode
        :matrix="mergedMatrix"
      />
      <p class="HomePage-links">
        Image from <a href="https://www.e-hon.ne.jp/bec/SA/Detail?refShinCode=0100000000000007245581&amp;Action_id=121&amp;Sza_id=C0">賢い犬リリエンタール 4（葦原大介）</a>
        (<a href="https://www.amazon.co.jp/dp/B00B45DJUI/">Kindle</a>)
        <br/>
        Recommend to read:
        <a href="http://www.ajimatics.com/entry/2018/10/31/060000">線形代数の知識ゼロから始めて行列式「だけ」理解する - アジマティクス</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IPos, IMatrix, getMatrixStr, mergeMatrix, roundMatrix } from '@/misc';
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
  public $refs!: {
    header: Vue;
  };

  protected graphWidth = 0;
  protected graphHeight = 0;
  protected graphTop = 0;
  protected posInitialOrigin: IPos = { x: 100, y: 100 };
  protected posOrigin: IPos = Object.assign({}, this.posInitialOrigin);
  protected posOriginDiff: IPos = { x: 0, y: 0 };

  protected get mergedOrigin(): IPos {
    return {
      x: this.posOrigin.x + this.posOriginDiff.x,
      y: this.posOrigin.y + this.posOriginDiff.y,
    };
  }

  protected matrix: IMatrix = {
    ix: 1, iy: 0,
    jx: 0, jy: 1,
    tx: 0, ty: 0,
  };
  protected draggingMatrix: IMatrix = {
    ix: 0, iy: 0,
    jx: 0, jy: 0,
    tx: 0, ty: 0,
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
    return getMatrixStr(this.mergedMatrix);
  }

  public mounted() {
    window.addEventListener('resize', this.window_onResize);
    window.document.body.setAttribute('data-page', 'HomePage');
    this.updateSize();
  }

  public destroyed() {
    window.removeEventListener('resize', this.window_onResize);
    window.document.body.removeAttribute('data-page');
  }

  public window_onResize() {
    this.updateSize();
  }

  public graph_onMove(diff: IMatrix) {
    Object.assign(this.draggingMatrix, diff);
  }

  public graph_onEnd() {
    this.matrix = mergeMatrix(this.matrix, this.draggingMatrix);
    this.draggingMatrix = {
      ix: 0, iy: 0,
      jx: 0, jy: 0,
      tx: 0, ty: 0,
    };
  }

  public graph_onOriginMove(diff: IPos) {
    this.posOriginDiff.x = diff.x;
    this.posOriginDiff.y = diff.y;
  }

  public graph_onOriginMoveEnd() {
    this.posOrigin.x += this.posOriginDiff.x;
    this.posOrigin.y += this.posOriginDiff.y;
    this.posOriginDiff.x = 0;
    this.posOriginDiff.y = 0;
  }

  public initial_onClick() {
    Object.assign(this.posOrigin, this.posInitialOrigin);
    Object.assign(this.matrix, {
      ix: 1, iy: 0,
      jx: 0, jy: 1,
      tx: 0, ty: 0,
    });
  }

  public rotate_onClick() {
    Object.assign(this.posOrigin, this.posInitialOrigin);
    Object.assign(this.matrix, {
      ix: this.cos(30), iy: this.sin(30),
      jx: this.cos(90 + 30), jy: this.sin(90 + 30),
      tx: 0, ty: 0,
    });
  }

  public flip_onClick() {
    Object.assign(this.posOrigin, this.posInitialOrigin);
    Object.assign(this.matrix, {
      ix: -1, iy: 0,
      jx: 0, jy: 1,
      tx: 100, ty: 0,
    });
  }

  protected updateSize() {
    const el = window.document.documentElement;
    if (!el) {
      return;
    }

    this.graphTop = this.$refs.header.$el.clientHeight;
    this.graphWidth = el.clientWidth;
    this.graphHeight = el.clientHeight - this.graphTop;
  }

  protected cos(deg: number) {
    return Math.cos(deg / 360 * Math.PI * 2);
  }

  protected sin(deg: number) {
    return Math.sin(deg / 360 * Math.PI * 2);
  }
}
</script>

<style>
body[data-page="HomePage"] {
  overflow: hidden;
}
.HomePage {
  margin-top: calc(var(--GHeader-height) + 1rem);
}
.HomePage-controlPanel {
  background: #ccc9;
  border-top: 1px solid #ccc;
  bottom: 0;
  box-sizing: border-box;
  box-shadow: 0 -1px 5px #0003;
  left: 0;
  overflow: auto;
  padding: 0.4em;
  position: absolute;
  width: 100%;
}
.HomePage-position {
  font-weight: bold;
}
.HomePage-links {
  font-size: 10px;
}
</style>
