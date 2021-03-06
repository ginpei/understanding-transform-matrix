<template>
  <svg class="SvgGraph"
    :style="{ top: `${positionTop}px` }"
    :width="width"
    :height="height"
  >
    <SvgGrid
      :width="width"
      :height="height"
      :posOrigin="posOrigin"
      :interval="aspectRatio"
    />
    <g
      :style="{ transform: `translate(${ox}px, ${oy}px)` }"
    >
      <SvgTarget
        :matrix="matrix"
      />
      <g
        :style="{
          transform: `translate(${tx}px, ${ty}px)`,
        }"
      >
        <SvgArrow
          :color="colors.i"
          :x="(ix) * aspectRatio"
          :y="(iy) * aspectRatio"
        />
        <SvgArrow
          :color="colors.j"
          :x="(jx) * aspectRatio"
          :y="(jy) * aspectRatio"
        />
        <circle cx="0" cy="0" r="5" stroke-width="2" fill="#fff"
          :stroke="colors.translation"
        />
        <SvgDragPoint
          :title="`i (${ix}, ${iy})`"
          :color="colors.i"
          :calm="!dragging"
          :x="ix * aspectRatio"
          :y="iy * aspectRatio"
          :onMove="i_onMove"
          :onEnd="onDragEnd"
        />
        <SvgDragPoint
          :title="`j (${jx}, ${jy})`"
          :color="colors.j"
          :calm="!dragging"
          :x="jx * aspectRatio"
          :y="jy * aspectRatio"
          :onMove="j_onMove"
          :onEnd="onDragEnd"
        />
      </g>
      <SvgDragPoint
        :title="`translation (${tx}, ${ty})`"
        :color="colors.translation"
        :calm="!dragging"
        :x="tx"
        :y="ty"
        :onMove="t_onMove"
        :onEnd="onDragEnd"
      />
    </g>
    <g
      v-show="pointIndicatorVisible"
      :transform="`translate(
        ${posOrigin.x + matrix.tx + (matrix.ix * aspectRatio) - (30 / 2)}
        ${posOrigin.y + matrix.ty + (matrix.iy * aspectRatio)})`"
    >
      <image class="SvgGraph-pointIndicator"
        xlink:href="/hand-point-up-regular.svg" width="30" height="30"
      />
    </g>
  </svg>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
import { IMatrix, IPos, colors } from '@/misc';
import SvgGrid from './SvgGrid.vue';
import SvgTarget from './SvgTarget.vue';
import SvgArrow from './SvgArrow.vue';
import SvgDragPoint from './SvgDragPoint.vue';
import DragHandler from '../DragHandler';

@Component({
  components: {
    SvgGrid,
    SvgTarget,
    SvgArrow,
    SvgDragPoint,
  },
})
export default class SvgGraph extends Vue {
  public colors = colors;
  public aspectRatio = 100;

  @Prop() protected width!: number;
  @Prop() protected height!: number;
  @Prop() protected positionTop!: number;
  @Prop() protected posOrigin!: IPos;
  @Prop() protected matrix!: IMatrix;
  @Prop() protected onMove!: (diff: Partial<IMatrix>) => void;
  @Prop() protected onEnd!: () => void;
  @Prop() protected onOriginMove!: (diff: IPos) => void;
  @Prop() protected onOriginMoveEnd!: () => void;
  @Prop() protected pointIndicatorVisible!: boolean;

  protected dragging = false;
  protected dragHandler = new DragHandler();

  // origin
  protected get ox() { return this.posOrigin.x; }
  protected get oy() { return this.posOrigin.y; }

  // vector i
  protected get ix() { return this.matrix.ix; }
  protected get iy() { return this.matrix.iy; }

  // vector j
  protected get jx() { return this.matrix.jx; }
  protected get jy() { return this.matrix.jy; }

  // translation
  protected get tx() { return this.matrix.tx; }
  protected get ty() { return this.matrix.ty; }

  public mounted() {
    this.dragHandler.start({
      el: this.$el,
      onEnd: (diff) => this.onOriginMoveEnd(),
      onMove: (diff) => this.onOriginMove(diff),
      onStart: (data) => this.onOriginMoveStart(data),
    });
  }

  public destroyed() {
    this.dragHandler.stop();
  }

  public onOriginMoveStart(data: { event: MouseEvent | TouchEvent, stop: () => void }) {
    if (data.event.target !== this.$el) {
      data.stop();
    }
  }

  public t_onMove(diff: IPos) {
    this.dragging = true;
    this.onMove({
      tx: diff.x,
      ty: diff.y,
    });
  }

  public i_onMove(diff: IPos) {
    this.dragging = true;
    this.onMove({
      ix: diff.x / this.aspectRatio,
      iy: diff.y / this.aspectRatio,
    });
  }

  public j_onMove(diff: IPos) {
    this.dragging = true;
    this.onMove({
      jx: diff.x / this.aspectRatio,
      jy: diff.y / this.aspectRatio,
    });
  }

  public onDragEnd(diff: IPos) {
    this.onEnd();
    this.dragging = false;
  }
}
</script>

<style>
.SvgGraph {
  left: 0;
  position: absolute;
}
.SvgGraph-pointIndicator {
  animation: SvgGraph-pointIndicator 3s 2s infinite backwards;
  pointer-events: none;
}

@keyframes SvgGraph-pointIndicator {
  0% { transform: translate(0, -10px); opacity: 0; }
  5% { transform: translate(0, -10px); opacity: 1; }
  20% { transform: translate(0, 0) }
  50% { transform: translate(50px, 20px); opacity: 1; }
  100% { transform: translate(50px, 20px); opacity: 0; }
}
</style>
