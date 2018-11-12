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
      :pointIndicatorVisible="pointIndicatorVisible"
    />
    <div class="HomePage-controlPanel">
      <HomeFloatingPanel
        :curTab="curTab"
        :matrix="mergedMatrix"
        :onTabChange="floatingPanel_onTabChange"
        :onPreset="floatingPanel_onPreset"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IPos, IMatrix, getMatrixStr, mergeMatrix, roundMatrix } from '@/misc';
import SvgGraph from '@/components/SvgGraph.vue';
import GHeader from '@/components/GHeader.vue';
import HomeFloatingPanel, { TabName, defaultTabName } from '@/components/HomeFloatingPanel.vue';

@Component({
  components: {
    SvgGraph,
    GHeader,
    HomeFloatingPanel,
  },
})
export default class HomePage extends Vue {
  public $refs!: {
    header: Vue;
  };

  protected pointIndicatorVisible = true;
  protected graphWidth = 0;
  protected graphHeight = 0;
  protected graphTop = 0;
  protected posInitialOrigin: IPos = { x: 100, y: 100 };
  protected posOrigin: IPos = Object.assign({}, this.posInitialOrigin);
  protected posOriginDiff: IPos = { x: 0, y: 0 };
  protected curTab = defaultTabName;

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
    this.pointIndicatorVisible = false;
    Object.assign(this.draggingMatrix, diff);

    if (this.curTab !== TabName.hide) {
      this.curTab = TabName.code;
    }
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

  public floatingPanel_onTabChange(data: { name: TabName }) {
    if (this.curTab === data.name) {
      this.curTab = TabName.hide;
    } else {
      this.curTab = data.name;
    }
  }

  public floatingPanel_onPreset(data: { matrix: IMatrix }) {
    Object.assign(this.posOrigin, this.posInitialOrigin);
    Object.assign(this.matrix, data.matrix);
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
  bottom: 0;
  box-sizing: border-box;
  left: 0;
  position: absolute;
  width: 100%;
}
</style>
