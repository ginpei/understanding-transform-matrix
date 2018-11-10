<template>
  <g class="SvgDragPoint"
    :transform="`translate(${x}, ${y})`"
  >
    <text class="SvgDragPoint-label" x="0.5em" y="-1em"
      :fill="color"
    >{{ title }}</text>
    <circle class="SvgDragPoint-circle" r="10" />
  </g>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import DragHandler from '../DragHandler';
import { IPos, zeroPos, noop, fixMatrixNumber } from '@/misc';

@Component
export default class SvgDragPoint extends Vue {
  @Prop() protected title!: string;
  @Prop() protected color!: string;
  @Prop(Number) protected x!: number;
  @Prop(Number) protected y!: number;
  @Prop({ default: noop }) protected onMove!: (diff: IPos) => void;
  @Prop({ default: noop }) protected onEnd!: (diff: IPos) => void;

  protected dragHandler = new DragHandler();

  protected get sx() {
    // TODO remove magic number
    return fixMatrixNumber((this.x) / 100);
  }

  protected get sy() {
    // TODO remove magic number
    return fixMatrixNumber((this.y) / 100);
  }

  constructor() {
    super();
  }

  public mounted() {
    this.dragHandler.start({
      el: this.$el,
      onEnd: (diff) => this.onDragEnd(diff),
      onMove: (diff) => this.onDragMove(diff),
    });
  }

  public destroyed() {
    this.dragHandler.stop();
  }

  public onDragMove(diff: IPos) {
    if (this.onMove) {
      this.onMove(diff);
    }
  }

  public onDragEnd(diff: IPos) {
    if (this.onEnd) {
      this.onEnd(diff);
    }
  }
}
</script>

<style scoped>
.SvgDragPoint-label {
  font-size: 10px;
  font-weight: bold;
  text-shadow:
    1px 1px 1px #fff,
    -1px 1px 1px #fff,
    1px -1px 1px #fff,
    -1px -1px 1px #fff;
  pointer-events: none;
}

.SvgDragPoint-circle {
  animation: blink 1s alternate infinite ease-out;
  cursor: move;
  fill: #0cf9;
  stroke-width: 0;
}

@keyframes blink {
  0% { opacity: 1 }
  50% { opacity: 0 }
  100% { opacity: 0 }
}
</style>
