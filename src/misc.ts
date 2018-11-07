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
