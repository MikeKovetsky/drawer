import {Injectable} from '@angular/core';
import {HistoryService} from './history.service';
import {ToolsService} from './tools.service';

@Injectable()
export class HotKeysService {

  constructor(private history: HistoryService, private tools: ToolsService) {}

  init() {
    document.onkeyup = (e) => {
      this.handler(e);
    };
  }

  handler(e: KeyboardEvent) {
    if (e.ctrlKey) {
      if (e.key === 'z') {
        this.history.back();
      }
      if (e.key === 's') {
        this.tools.splitMode = !this.tools.splitMode;
      }
      if (e.key === 'c') {
        this.tools.chainMode.next(!this.tools.chainMode.value);
      }
    }

  }
}
