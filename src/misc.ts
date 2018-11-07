export const noop = () => undefined;

export interface IPos {
  x: number;
  y: number;
}

export const invalidPos: IPos = Object.freeze({ x: NaN, y: NaN });
export const zeroPos: IPos = Object.freeze({ x: 0, y: 0 });

export const getEventPositions = (event: MouseEvent) => {
  const positions: IPos[] = [];
  if (event instanceof MouseEvent) {
    positions.push({ x: event.pageX, y: event.pageY });
  }

  return positions;
};

export interface IMatrix {
  ix: number;
  iy: number;
  jx: number;
  jy: number;
  tx: number;
  ty: number;
}

export const getMatrixStr = (m: IMatrix, diff: IMatrix) => {
  return `matrix(
    ${fixMatrixNumber(m.ix + diff.ix)}, ${fixMatrixNumber(m.iy + diff.iy)},
    ${fixMatrixNumber(m.jx + diff.jx)}, ${fixMatrixNumber(m.jy + diff.jy)},
    ${fixMatrixNumber(m.tx + diff.tx)}, ${fixMatrixNumber(m.ty + diff.ty)}
  )`;
};

const fixMatrixNumber = (n: number) => {
  return Number(n.toFixed(3));
};
