<template>
  <g class="SvgDragPoint"
    :transform="`translate(${x}, ${y})`"
  >
    <text class="SvgDragPoint-label" x="0.5em" y="-1em"
      :fill="color"
    >{{ title }}</text>
    <circle class="SvgDragPoint-touchArea" r="30" />
    <circle class="SvgDragPoint-circle" r="10"
      v-show="calm"
    />
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
  @Prop() protected calm!: boolean;
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
.SvgDragPoint {
  cursor: move;
}
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

.SvgDragPoint-touchArea {
  fill: transparent;
}

.SvgDragPoint-circle {
  animation: SvgDragPoint-blink 3s infinite ease-in;
  fill: var(--color-xxx-1);
  stroke-width: 0;
}

@keyframes SvgDragPoint-blink {
  0% { opacity: 0; transform: scale(1); }
  50% { opacity: 0; transform: scale(1); }
  53% { opacity: 1; transform: scale(2); }
  80% { opacity: 0; transform: scale(1.5); }
  100% { opacity: 0; transform: scale(1); }
}
</style>
