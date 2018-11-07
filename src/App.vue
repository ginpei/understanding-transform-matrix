<template>
  <div id="app">
    <h1>{{ sMatrix }}</h1>
    <svg style="box-shadow: 0 0 10px #0009;" width="300" height="300">
      <SvgGrid />
      <g
        :style="{
          transform: `translate(${ox}px, ${oy}px) ${sMatrix}`,
        }"
      >
        <image class="nodrag" href="/image.png" width="100" height="100" />
        <SvgArrow />
        <SvgArrow style="
          transform: rotate(90deg);
        "/>
      </g>
      <g
        :style="{
          transform: `translate(${ox + tx + dtx}px, ${oy + ty + dty}px)`,
        }"
      >
        <circle cx="0" cy="0" r="5" stroke="#333" fill="#fff" />
        <SvgHandle
          :x="ix * 100"
          :y="iy * 100"
          :onMove="i_onMove"
          :onEnd="i_onEnd"
        />
        <SvgHandle
          :x="jx * 100"
          :y="jy * 100"
          :onMove="j_onMove"
          :onEnd="j_onEnd"
        />
      </g>
      <g
        :style="{
          transform: `translate(${ox + tx}px, ${oy + ty}px)`,
        }"
      >
        <SvgHandle
          :x="0"
          :y="0"
          :onMove="t_onMove"
          :onEnd="t_onEnd"
        />
      </g>
    </svg>
    <p>
      Image from <a href="https://www.e-hon.ne.jp/bec/SA/Detail?refShinCode=0100000000000007245581&Action_id=121&Sza_id=C0">賢い犬リリエンタール 4（葦原大介）</a>
      (<a href="https://www.amazon.co.jp/dp/B00B45DJUI/">Kindle</a>)
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SvgArrow from './components/SvgArrow.vue';
import SvgGrid from './components/SvgGrid.vue';
import SvgHandle from './components/SvgHandle.vue';
// import * as dragHandler from './dragHandler';
import { IPos } from './misc';

@Component({
  components: {
    SvgArrow,
    SvgGrid,
    SvgHandle,
  },
})
export default class App extends Vue {
  // offset
  protected ox = 100;
  protected oy = 100;

  // vector i
  protected ix = 1;
  protected iy = 0;
  protected dix = 0;
  protected diy = 0;

  // vector j
  protected jx = 0;
  protected jy = 1;
  protected djx = 0;
  protected djy = 0;

  // transition
  protected tx = 0;
  protected ty = 0;
  protected dtx = 0;
  protected dty = 0;

  get sMatrix() {
    return `matrix(
      ${this.fix(this.ix + this.dix)}, ${this.fix(this.iy + this.diy)},
      ${this.fix(this.jx + this.djx)}, ${this.fix(this.jy + this.djy)},
      ${this.fix(this.tx + this.dtx)}, ${this.fix(this.ty + this.dty)}
    )`;
  }

  public mounted() {
    // dragHandler.setUp(document, {
    //   move: (dPos: IPos) => this.onMouseMove(dPos),
    // });
  }

  public destroyed() {
    // dragHandler.shutDown();
  }

  public t_onMove(diff: IPos) {
    this.dtx = diff.x;
    this.dty = diff.y;
  }

  public t_onEnd(diff: IPos) {
    this.tx = this.tx + diff.x;
    this.ty = this.ty + diff.y;
    this.dtx = 0;
    this.dty = 0;
  }

  public i_onMove(diff: IPos) {
    const aspectRatio = 100;
    this.dix = diff.x / aspectRatio;
    this.diy = diff.y / aspectRatio;
  }

  public i_onEnd(diff: IPos) {
    const aspectRatio = 100;
    this.ix = this.ix + (diff.x / aspectRatio);
    this.iy = this.iy + (diff.y / aspectRatio);
    this.dix = 0;
    this.diy = 0;
  }

  public j_onMove(diff: IPos) {
    const aspectRatio = 100;
    this.djx = diff.x / aspectRatio;
    this.djy = diff.y / aspectRatio;
  }

  public j_onEnd(diff: IPos) {
    const aspectRatio = 100;
    this.jx = this.jx + (diff.x / aspectRatio);
    this.jy = this.jy + (diff.y / aspectRatio);
    this.djx = 0;
    this.djy = 0;
  }

  protected fix(n: number) {
    return Number(n.toFixed(3));
  }
}
</script>

<style>
#app {
  text-align: center;
}
.nodrag {
  pointer-events: none;
}
</style>
