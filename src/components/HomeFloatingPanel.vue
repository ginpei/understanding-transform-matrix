<template>
  <div class="HomeFloatingPanel"
    :data-page="curTab"
  >
    <div class="HomeFloatingPanel-tabPages">
      <div class="HomeFloatingPanel-tabPage" data-name="code">
        <MatrixCode
          :matrix="matrix"
        />
      </div>
      <div class="HomeFloatingPanel-tabPage" data-name="presets">
        <p>
          Presets:
          <button @click="initial_onClick">Initial</button>
          <button @click="rotate_onClick">Rotate 30°</button>
          <button @click="flip_onClick">Flip horizontally</button>
        </p>
      </div>
      <div class="HomeFloatingPanel-tabPage" data-name="references">
        <ul>
          <li>
            Recommend to read:
            <a href="http://www.ajimatics.com/entry/2018/10/31/060000">線形代数の知識ゼロから始めて行列式「だけ」理解する - アジマティクス</a>
          </li>
          <li>
            Image from <a href="https://www.e-hon.ne.jp/bec/SA/Detail?refShinCode=0100000000000007245581&amp;Action_id=121&amp;Sza_id=C0">賢い犬リリエンタール 4（葦原大介）</a>
            (<a href="https://www.amazon.co.jp/dp/B00B45DJUI/">Kindle</a>)
          </li>
          <li>
            SVG icons from <a href="https://fontawesome.com/license">Font Awesome</a> licensed under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.
          </li>
        </ul>
      </div>
    </div>
    <div class="HomeFloatingPanel-tabs">
      <span class="HomeFloatingPanel-tabButton" data-name="code"
        @click="tabButton_onClick"
      >
        <img class="HomeFloatingPanel-tabButtonImage" src="/code-solid.svg" width="auto" height="16" alt="Code" />
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

@Component({
  components: {
    MatrixCode,
  },
})
export default class HomeFloatingPanel extends Vue {
  @Prop() protected matrix!: IMatrix;
  @Prop() protected onPreset!: (data: { type: string }) => void;

  protected curTab = 'code';

  public tabButton_onClick(event: MouseEvent) {
    const el = event.currentTarget as HTMLSpanElement;
    const name = el.getAttribute('data-name')!;
    this.curTab = name;
  }

  public initial_onClick() {
    this.onPreset({ type: 'initial' });
  }

  public rotate_onClick() {
    this.onPreset({ type: 'rotate' });
  }

  public flip_onClick() {
    this.onPreset({ type: 'flip' });
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
  flex: 1;
  text-align: center;
  line-height: 30px;
}
.HomeFloatingPanel[data-page="code"]
  .HomeFloatingPanel-tabButton[data-name="code"],
.HomeFloatingPanel[data-page="presets"]
  .HomeFloatingPanel-tabButton[data-name="presets"],
.HomeFloatingPanel[data-page="references"]
  .HomeFloatingPanel-tabButton[data-name="references"] {
  background-image: radial-gradient(ellipse at center 80%,
  #6cf 0%, #6cf 5%, transparent 20%);
}
.HomeFloatingPanel-tabButtonImage {
  vertical-align: middle;
}

.HomeFloatingPanel-tabPage {
  display: none;
  padding: 0.4em;
}
.HomeFloatingPanel[data-page="code"]
  .HomeFloatingPanel-tabPage[data-name="code"],
.HomeFloatingPanel[data-page="presets"]
  .HomeFloatingPanel-tabPage[data-name="presets"],
.HomeFloatingPanel[data-page="references"]
  .HomeFloatingPanel-tabPage[data-name="references"] {
  display: block;
}
</style>
