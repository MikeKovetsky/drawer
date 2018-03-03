import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

export type TOOL_PANEL = 'anchor' | 'transformations' | 'specific';

@Injectable()
export class ToolsService {
  splitMode = new Tool();
  chainMode = new Tool();
  controlPointsShown = new Tool(true);
  private _openedPanel: TOOL_PANEL;

  set openedPanel(pane: TOOL_PANEL) {
    this._openedPanel = pane === this._openedPanel ? null : pane;
  }
  get openedPanel() {
    return this._openedPanel;
  }
}


class Tool {
  private _tool: BehaviorSubject<boolean>;
  constructor(toolValue: boolean = false) {
    this._tool = new BehaviorSubject<boolean>(toolValue);
  }

  set(value) {
    this._tool.next(value);
  }

  get(): boolean {
    return this._tool.getValue();
  }

  watch(): Observable<boolean> {
    return this._tool.asObservable();
  }

  toggle() {
    this._tool.next(!this._tool.value);
  }
}
