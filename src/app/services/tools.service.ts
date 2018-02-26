import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export type TOOL_PANEL = 'anchor' | 'transformations' | 'specific';

@Injectable()
export class ToolsService {
  split = false;
  chainMode = new BehaviorSubject(false);
  private _openedPanel: TOOL_PANEL = null;

  set openedPanel(panelName: TOOL_PANEL) {
    this._openedPanel = this._openedPanel !== panelName ? panelName : null;
  }

  get openedPanel(): TOOL_PANEL {
    return this._openedPanel;
  }

}
