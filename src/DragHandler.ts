import { getEventPositions, IPos, invalidPos } from './misc';

export default class DragHandler {
  protected _dragging = false;
  protected el: HTMLElement | undefined = undefined;
  protected startedPos = invalidPos;
  protected lastPos = invalidPos;
  protected onEnd: ((diff: IPos) => void) | undefined = undefined;
  protected onMove: ((diff: IPos) => void) | undefined = undefined;

  public get dragging() {
    return this._dragging;
  }

  constructor() {
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
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
    this.el.addEventListener('touchstart', this.onTouchStart);
    document.addEventListener('touchmove', this.onTouchMove);
    document.addEventListener('touchend', this.onTouchEnd);
    document.addEventListener('touchcancel', this.onTouchEnd);
  }

  public stop() {
    if (!this.el) {
      throw new Error('Unexpected situation: this.el must be set');
    }

    this.el.removeEventListener('mousedown', this.onMouseDown);
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    this.el.removeEventListener('touchstart', this.onTouchStart);
    document.removeEventListener('touchmove', this.onTouchMove);
    document.removeEventListener('touchend', this.onTouchEnd);
    document.removeEventListener('touchcancel', this.onTouchEnd);
  }

  public onMouseDown(event: MouseEvent) {
    const [pos] = getEventPositions(event);
    this.startDragging(pos);
  }

  public onMouseMove = (event: MouseEvent) => {
    if (this._dragging) {
      const [pos] = getEventPositions(event);
      this.drag(pos);
    }
  }

  public onMouseUp = (event: MouseEvent) => {
    if (this._dragging) {
      const [pos] = getEventPositions(event);
      this.endDragging(pos);
    }
  }

  public onTouchStart(event: TouchEvent) {
    if (!this._dragging) {
      const [pos] = getEventPositions(event);
      this.startDragging(pos);
    }
  }

  public onTouchMove = (event: TouchEvent) => {
    if (this._dragging) {
      const [pos] = getEventPositions(event);
      this.drag(pos);
    }
  }

  public onTouchEnd = (event: TouchEvent) => {
    if (this._dragging) {
      this.endDragging(this.lastPos);
    }
  }

  protected startDragging(pos: IPos) {
    this._dragging = true;
    this.startedPos = pos;
  }

  protected drag(pos: IPos) {
    if (!this._dragging) {
      return;
    }

    const diff: IPos = {
      x: pos.x - this.startedPos.x,
      y: pos.y - this.startedPos.y,
    };

    this.lastPos = pos;

    if (this.onMove) {
      this.onMove(diff);
    }
  }

  protected endDragging(pos: IPos) {
    if (!this._dragging) {
      return;
    }

    const diff: IPos = {
      x: pos.x - this.startedPos.x,
      y: pos.y - this.startedPos.y,
    };

    this.startedPos = invalidPos;
    this.lastPos = invalidPos;
    this._dragging = false;

    if (this.onEnd) {
      this.onEnd(diff);
    }
  }
}
