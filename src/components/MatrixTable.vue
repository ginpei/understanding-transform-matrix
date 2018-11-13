<template>
  <table class="MatrixTable">
    <tbody>
      <tr>
        <td rowspan="3">
          <span class="MatrixTable-fence">(</span>
        </td>
        <td class="MatrixTable-number"><span class="MatrixTable-value"
          :style="{ color: colors.i }"
        >{{ matrix.ix }}</span></td>
        <td class="MatrixTable-number"><span class="MatrixTable-value"
          :style="{ color: colors.j }"
        >{{ matrix.jx }}</span></td>
        <td class="MatrixTable-number"><span class="MatrixTable-value"
          :style="{ color: colors.translation }"
        >{{ matrix.tx }}</span></td>
        <td rowspan="3">
          <span class="MatrixTable-fence">)</span>
        </td>
      </tr>
      <tr>
        <td class="MatrixTable-number"><span class="MatrixTable-value"
          :style="{ color: colors.i }"
        >{{ matrix.iy }}</span></td>
        <td class="MatrixTable-number"><span class="MatrixTable-value"
          :style="{ color: colors.j }"
        >{{ matrix.jy }}</span></td>
        <td class="MatrixTable-number"><span class="MatrixTable-value"
          :style="{ color: colors.translation }"
        >{{ matrix.ty }}</span></td>
      </tr>
      <tr>
        <td class="MatrixTable-number">0</td>
        <td class="MatrixTable-number">0</td>
        <td class="MatrixTable-number">1</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
import { colors, IMatrix } from '@/misc';

@Component({})
export default class MatrixTable extends Vue {
  @Prop() protected matrix!: IMatrix;

  protected colors = colors;
}
</script>

<style>
.MatrixTable {
  display: inline-table;
}
.MatrixTable-fence {
  display: inline-block;
  font-family: serif;
  font-size: 2em;
  font-weight: 100;
  transform: scale(1, 2);
}
.MatrixTable-number {
  min-width: 2.5em;
  text-align: center;
}
.MatrixTable-value {
  font-weight: bold;
}
</style>
