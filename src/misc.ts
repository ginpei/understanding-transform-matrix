export const noop = () => undefined;

export interface IPos {
  x: number;
  y: number;
}

export const invalidPos: IPos = Object.freeze({ x: NaN, y: NaN });
export const zeroPos: IPos = Object.freeze({ x: 0, y: 0 });

export const getEventPositions = (event: MouseEvent | TouchEvent) => {
  let positions: IPos[];

  if (event instanceof MouseEvent) {
    positions = [{ x: event.pageX, y: event.pageY }];
  } else {
    positions = [...event.touches].map((touch) =>
      ({ x: touch.pageX, y: touch.pageY }));
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

export const mergeMatrix = (m: IMatrix, diff: IMatrix): IMatrix => {
  return {
    ix: m.ix + diff.ix,
    iy: m.iy + diff.iy,
    jx: m.jx + diff.jx,
    jy: m.jy + diff.jy,
    tx: m.tx + diff.tx,
    ty: m.ty + diff.ty,
  };
};
export const roundMatrix = (m: IMatrix): IMatrix => {
  return {
    ix: fixMatrixNumber(m.ix),
    iy: fixMatrixNumber(m.iy),
    jx: fixMatrixNumber(m.jx),
    jy: fixMatrixNumber(m.jy),
    tx: fixMatrixNumber(m.tx),
    ty: fixMatrixNumber(m.ty),
  };
};
export const getMatrixStr = (m: IMatrix, diff: IMatrix) => {
  const rm = roundMatrix(mergeMatrix(m, diff));
  return `matrix(${[
    rm.ix, rm.iy,
    rm.jx, rm.jy,
    rm.tx, rm.ty,
  ].join(', ')})`;
};

const fixMatrixNumber = (n: number) => {
  return Number(n.toFixed(3));
};
