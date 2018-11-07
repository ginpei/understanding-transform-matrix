<template>
  <svg class="SvgGraph" width="300" height="300">
    <SvgGrid />
    <g
      :style="{ transform: `translate(${ox}px, ${oy}px)` }"
    >
      <g
        :style="{ transform: sMatrix }"
      >
        <image class="SvgGraph-image" href="/image.png"
          :width="aspectRatio"
          :height="aspectRatio"
        />
        <SvgArrow />
        <SvgArrow style="transform: rotate(90deg);"/>
      </g>
      <g
        :style="{
          transform: `translate(${tx + dtx}px, ${ty + dty}px)`,
        }"
      >
        <circle cx="0" cy="0" r="5" stroke="#333" fill="#fff" />
        <SvgHandle
          :x="ix * aspectRatio"
          :y="iy * aspectRatio"
          :onMove="i_onMove"
          :onEnd="i_onEnd"
        />
        <SvgHandle
          :x="jx * aspectRatio"
          :y="jy * aspectRatio"
          :onMove="j_onMove"
          :onEnd="j_onEnd"
        />
      </g>
      <SvgHandle
        :x="tx"
        :y="ty"
        :onMove="t_onMove"
        :onEnd="t_onEnd"
      />
    </g>
  </svg>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
import { IMatrix, IPos, getMatrixStr } from '@/misc';
import SvgArrow from './SvgArrow.vue';
import SvgGrid from './SvgGrid.vue';
import SvgHandle from './SvgHandle.vue';

@Component({
  components: {
    SvgArrow,
    SvgGrid,
    SvgHandle,
  },
})
export default class SvgGraph extends Vue {
  public aspectRatio = 100;

  @Prop() protected posOrigin!: IPos;
  @Prop() protected matrix!: IMatrix;
  @Prop() protected draggingMatrix!: IMatrix;
  @Prop() protected onUpdate!:
    (m: Partial<IMatrix>, dm: Partial<IMatrix>) => void;

  // offset
  protected get ox() { return this.posOrigin.x; }
  protected get oy() { return this.posOrigin.y; }

  // vector i
  protected get ix() { return this.matrix.ix; }
  protected get iy() { return this.matrix.iy; }
  protected get dix() { return this.draggingMatrix.ix; }
  protected get diy() { return this.draggingMatrix.iy; }

  // vector j
  protected get jx() { return this.matrix.jx; }
  protected get jy() { return this.matrix.jy; }
  protected get djx() { return this.draggingMatrix.jx; }
  protected get djy() { return this.draggingMatrix.jy; }

  // transition
  protected get tx() { return this.matrix.tx; }
  protected get ty() { return this.matrix.ty; }
  protected get dtx() { return this.draggingMatrix.tx; }
  protected get dty() { return this.draggingMatrix.ty; }


  protected get sMatrix() {
    return getMatrixStr(this.matrix, this.draggingMatrix);
  }

  public t_onMove(diff: IPos) {
    this.onUpdate(
      {},
      {
        tx: diff.x,
        ty: diff.y,
      },
    );
  }

  public t_onEnd(diff: IPos) {
    this.onUpdate(
      {
        tx: this.tx + diff.x,
        ty: this.ty + diff.y,
      },
      {
        tx: 0,
        ty: 0,
      },
    );
  }

  public i_onMove(diff: IPos) {
    this.onUpdate(
      {},
      {
        ix: diff.x / this.aspectRatio,
        iy: diff.y / this.aspectRatio,
      },
    );
  }

  public i_onEnd(diff: IPos) {
    this.onUpdate(
      {
        ix: this.ix + (diff.x / this.aspectRatio),
        iy: this.iy + (diff.y / this.aspectRatio),
      },
      {
        ix: 0,
        iy: 0,
      },
    );
  }

  public j_onMove(diff: IPos) {
    this.onUpdate(
      {},
      {
        jx: diff.x / this.aspectRatio,
        jy: diff.y / this.aspectRatio,
      },
    );
  }

  public j_onEnd(diff: IPos) {
    this.onUpdate(
      {
        jx: this.jx + (diff.x / this.aspectRatio),
        jy: this.jy + (diff.y / this.aspectRatio),
      },
      {
        jx: 0,
        jy: 0,
      },
    );
  }
}
</script>

<style scoped>
.SvgGraph {
  box-shadow: 0 0 10px #0009;
}
.SvgGraph-image {
  pointer-events: none;
}
</style>
