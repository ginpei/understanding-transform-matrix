<template>
  <div class="MatrixCode">
    <code>
      .the-target {<br/>
      &nbsp;&nbsp;transform: matrix(<span class="MatrixCode-value"
          :style="{ color: colors.i }"
        >{{ ix }}</span>,
        <span class="MatrixCode-value"
          :style="{ color: colors.i }"
        >{{ iy }}</span>,
        <span class="MatrixCode-value"
          :style="{ color: colors.j }"
        >{{ jx }}</span>,
        <span class="MatrixCode-value"
          :style="{ color: colors.j }"
        >{{ jy }}</span>,
        <span class="MatrixCode-value"
          :style="{ color: colors.translation }"
        >{{ tx }}</span>,
        <span class="MatrixCode-value"
          :style="{ color: colors.translation }"
        >{{ ty }}</span>);<br/>
      }
    </code>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
import { IMatrix, colors } from '@/misc';

@Component({})
export default class SvgGraph extends Vue {
  public colors = colors;

  @Prop() protected matrix!: IMatrix;

  protected get ix() { return this.matrix.ix; }
  protected get iy() { return this.matrix.iy; }
  protected get jx() { return this.matrix.jx; }
  protected get jy() { return this.matrix.jy; }
  protected get tx() { return this.matrix.tx; }
  protected get ty() { return this.matrix.ty; }
}
</script>

<style>
.MatrixCode {
  background: #f0f0f0;
  padding: 0.5em;
  margin: 1em 0;
  white-space: nowrap;
}
.MatrixCode-value {
  font-weight: bold;
}
</style>
