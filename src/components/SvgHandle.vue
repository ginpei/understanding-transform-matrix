<template>
  <circle class="SvgHandle" r="10"
    :cx="x + posDiff.x"
    :cy="y + posDiff.y"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import DragHandler from '../DragHandler';
import { IPos, zeroPos, noop } from '@/misc';

@Component
export default class SvgHandle extends Vue {
  @Prop(Number) protected x!: number;
  @Prop(Number) protected y!: number;
  @Prop({ default: noop }) protected onMove!: (diff: IPos) => void;
  @Prop({ default: noop }) protected onEnd!: (diff: IPos) => void;

  protected posDiff = zeroPos;
  protected dragHandler = new DragHandler();

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
    this.posDiff = diff;

    if (this.onMove) {
      this.onMove(diff);
    }
  }

  public onDragEnd(diff: IPos) {
    this.posDiff = zeroPos;

    if (this.onEnd) {
      this.onEnd(diff);
    }
  }
}
</script>

<style scoped>
.SvgHandle {
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
