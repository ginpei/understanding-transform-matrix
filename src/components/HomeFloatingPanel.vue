<template>
  <div class="HomeFloatingPanel"
    :data-page="curTab"
  >
    <div class="HomeFloatingPanel-tabPages">
      <article class="HomeFloatingPanel-tabPage"
        :data-name="defaultTabName"
      >
        <h1 class="HomeFloatingPanel-tabPageHeading">Code</h1>
        <MatrixCode
          :matrix="matrix"
        />
      </article>
      <article class="HomeFloatingPanel-tabPage" data-name="table">
        <h1 class="HomeFloatingPanel-tabPageHeading">Matrix</h1>
        <div class="HomeFloatingPanel-matrixTable">
          <MatrixTable
            :matrix="matrix"
          />
        </div>
      </article>
      <article class="HomeFloatingPanel-tabPage" data-name="presets">
        <h1 class="HomeFloatingPanel-tabPageHeading">Presets</h1>
        <button class="HomeFloatingPanel-presetButton" @click="initial_onClick">Initial</button>
        <button class="HomeFloatingPanel-presetButton" @click="rotate_onClick">Rotate 30°</button>
        <button class="HomeFloatingPanel-presetButton" @click="flip_onClick">Flip horizontally</button>
        <button class="HomeFloatingPanel-presetButton" @click="larger_onClick">Twice larger</button>
      </article>
      <article class="HomeFloatingPanel-tabPage" data-name="references">
        <h1 class="HomeFloatingPanel-tabPageHeading">References</h1>
        <ul class="HomeFloatingPanel-referenceList">
          <li class="HomeFloatingPanel-referenceItem">
            Recommend to read:
            <a href="http://www.ajimatics.com/entry/2018/10/31/060000">線形代数の知識ゼロから始めて行列式「だけ」理解する - アジマティクス</a>
          </li>
          <li class="HomeFloatingPanel-referenceItem">
            You may want to read:
            <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix">matrix() - CSS: Cascading Style Sheets | MDN</a>
          </li>
          <li class="HomeFloatingPanel-referenceItem">
            Image from <a href="https://www.e-hon.ne.jp/bec/SA/Detail?refShinCode=0100000000000007245581&amp;Action_id=121&amp;Sza_id=C0">賢い犬リリエンタール 4（葦原大介）</a>
            (or <a href="https://www.amazon.co.jp/dp/B00B45DJUI/">Kindle version</a>)
          </li>
          <li class="HomeFloatingPanel-referenceItem">
            SVG icons from <a href="https://fontawesome.com/license">Font Awesome</a> licensed under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.
          </li>
        </ul>
      </article>
    </div>
    <div class="HomeFloatingPanel-tabs">
      <span class="HomeFloatingPanel-tabButton"
        :data-name="defaultTabName"
        @click="tabButton_onClick"
      >
        <img class="HomeFloatingPanel-tabButtonImage" src="/code-solid.svg" width="auto" height="16" alt="Code" />
      </span>
      <span class="HomeFloatingPanel-tabButton" data-name="table"
        @click="tabButton_onClick"
      >
        <span class="HomeFloatingPanel-tabButtonImageText">()</span>
        <!-- <img class="HomeFloatingPanel-tabButtonImage" src="/sliders-h-solid.svg" width="auto" height="16" alt="Matrix" /> -->
      </span>
      <span class="HomeFloatingPanel-tabButton" data-name="presets"
        @click="tabButton_onClick"
      >
        <img class="HomeFloatingPanel-tabButtonImage" src="/sliders-h-solid.svg" width="auto" height="16" alt="Presets" />
      </span>
      <span class="HomeFloatingPanel-tabButton" data-name="references"
        @click="tabButton_onClick"
      >
        <img class="HomeFloatingPanel-tabButtonImage" src="/book-solid.svg" width="auto" height="16" alt="References" />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IMatrix } from '@/misc';
import MatrixCode from '@/components/MatrixCode.vue';
import MatrixTable from '@/components/MatrixTable.vue';

export enum TabName {
  hide = 'hide',
  code = 'code',
  table = 'table',
  presets = 'presets',
  references = 'references',
}
export const defaultTabName = TabName.code;

@Component({
  components: {
    MatrixCode,
    MatrixTable,
  },
})
export default class HomeFloatingPanel extends Vue {
  @Prop() protected matrix!: IMatrix;
  @Prop() protected onPreset!: (data: { matrix: IMatrix }) => void;
  @Prop() protected curTab!: TabName;
  @Prop() protected onTabChange!: (data: { name: TabName }) => void;

  protected defaultTabName = defaultTabName;

  public tabButton_onClick(event: MouseEvent) {
    const el = event.currentTarget as HTMLSpanElement;
    const name = el.getAttribute('data-name') as TabName; // :)
    this.onTabChange({ name });
  }

  public initial_onClick() {
    this.onPreset({
      matrix: {
        ix: 1, iy: 0,
        jx: 0, jy: 1,
        tx: 0, ty: 0,
      },
    });
  }

  public rotate_onClick() {
    this.onPreset({
      matrix: {
        ix: this.cos(30), iy: this.sin(30),
        jx: this.cos(90 + 30), jy: this.sin(90 + 30),
        tx: 0, ty: 0,
      },
    });
  }

  public flip_onClick() {
    this.onPreset({
      matrix: {
        ix: -1, iy: 0,
        jx: 0, jy: 1,
        tx: 100, ty: 0,
      },
    });
  }

  public larger_onClick() {
    this.onPreset({
      matrix: {
        ix: 2, iy: 0,
        jx: 0, jy: 2,
        tx: 0, ty: 0,
      },
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

<style>
.HomeFloatingPanel {
  background: #ccc9;
  border-top: 1px solid #ccc;
  box-shadow: 0 -1px 5px #0003;
  overflow: auto;
}

.HomeFloatingPanel-tabs {
  display: flex;
}
.HomeFloatingPanel-tabButton {
  cursor: pointer;
  flex: 1;
  text-align: center;
  line-height: 30px;
}
.HomeFloatingPanel[data-page="code"]
  .HomeFloatingPanel-tabButton[data-name="code"],
.HomeFloatingPanel[data-page="table"]
  .HomeFloatingPanel-tabButton[data-name="table"],
.HomeFloatingPanel[data-page="presets"]
  .HomeFloatingPanel-tabButton[data-name="presets"],
.HomeFloatingPanel[data-page="references"]
  .HomeFloatingPanel-tabButton[data-name="references"] {
  background-image: radial-gradient(ellipse at center 80%,
    var(--color-xxx-1) 0%, var(--color-xxx-1) 5%, transparent 20%);
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: 120px 30px;
}
.HomeFloatingPanel-tabButtonImage {
  vertical-align: middle;
}

.HomeFloatingPanel-tabPage {
  display: none;
  min-height: 90px;
  padding: 0.4em;
}
.HomeFloatingPanel[data-page="code"]
  .HomeFloatingPanel-tabPage[data-name="code"],
.HomeFloatingPanel[data-page="table"]
  .HomeFloatingPanel-tabPage[data-name="table"],
.HomeFloatingPanel[data-page="presets"]
  .HomeFloatingPanel-tabPage[data-name="presets"],
.HomeFloatingPanel[data-page="references"]
  .HomeFloatingPanel-tabPage[data-name="references"] {
  display: block;
}

.HomeFloatingPanel-tabPageHeading {
  font-size: 1em;
  margin: 0;
}

.HomeFloatingPanel-matrixTable {
  text-align: center;
}
.HomeFloatingPanel-presetButton {
  height: 3em;
  margin: 0.1em;
}
.HomeFloatingPanel-tabButtonImageText {
  font-weight: bold;
}
.HomeFloatingPanel-referenceList {
  margin: 0;
}
.HomeFloatingPanel-referenceItem {
  font-size: 0.8em;
  margin: 0.5em 0;
  line-height: 1em;
}
</style>
