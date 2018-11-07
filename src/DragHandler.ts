import { getEventPositions, IPos, invalidPos } from './misc';

export default class DragHandler {
  protected _dragging = false;
  protected el: HTMLElement | undefined = undefined;
  protected startedPos = invalidPos;
  protected onEnd: ((diff: IPos) => void) | undefined = undefined;
  protected onMove: ((diff: IPos) => void) | undefined = undefined;

  public get dragging() {
    return this._dragging;
  }

  constructor() {
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  public start(options: {
    el: HTMLElement,
    onEnd?: (diff: IPos) => void,
    onMove?: (diff: IPos) => void,
  }) {
    this.el = options.el;
    this.onEnd = options.onEnd;
    this.onMove = options.onMove;

    this.el.addEventListener('mousedown', this.onMouseDown);
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  public stop() {
    if (!this.el) {
      throw new Error('Unexpected situation: this.el must be set');
    }

    this.el.removeEventListener('mousedown', this.onMouseDown);
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  public onMouseDown(event: MouseEvent) {
    this._dragging = true;
    const [pos] = getEventPositions(event);
    this.startedPos = pos;
  }

  public onMouseMove = (event: MouseEvent) => {
    if (!this._dragging) {
      return;
    }

    const [pos] = getEventPositions(event);
    const diff: IPos = {
      x: pos.x - this.startedPos.x,
      y: pos.y - this.startedPos.y,
    };

    if (this.onMove) {
      this.onMove(diff);
    }
  }

  public onMouseUp = (event: MouseEvent) => {
    if (!this._dragging) {
      return;
    }

    const [pos] = getEventPositions(event);
    const diff: IPos = {
      x: pos.x - this.startedPos.x,
      y: pos.y - this.startedPos.y,
    };

    this.startedPos = invalidPos;
    this._dragging = false;

    if (this.onEnd) {
      this.onEnd(diff);
    }
  }
}
