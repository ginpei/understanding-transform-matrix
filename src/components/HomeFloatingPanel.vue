<template>
  <div class="HomeFloatingPanel">
    <p>
      Presets:
      <button @click="initial_onClick">Initial</button>
      <button @click="rotate_onClick">Rotate 30°</button>
      <button @click="flip_onClick">Flip horizontally</button>
    </p>
    <MatrixCode
      :matrix="matrix"
    />
    <p class="HomeFloatingPanel-links">
      Image from <a href="https://www.e-hon.ne.jp/bec/SA/Detail?refShinCode=0100000000000007245581&amp;Action_id=121&amp;Sza_id=C0">賢い犬リリエンタール 4（葦原大介）</a>
      (<a href="https://www.amazon.co.jp/dp/B00B45DJUI/">Kindle</a>)
      <br/>
      Recommend to read:
      <a href="http://www.ajimatics.com/entry/2018/10/31/060000">線形代数の知識ゼロから始めて行列式「だけ」理解する - アジマティクス</a>
    </p>
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
  padding: 0.4em;
}
.HomeFloatingPanel-links {
  font-size: 10px;
}
</style>
