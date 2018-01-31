import {Injectable} from '@angular/core';
import {HistoryService} from './history.service';

@Injectable()
export class HotKeysService {

  constructor(private history: HistoryService) {}

  init() {
    document.onkeyup = (e) => {
      this.handler(e);
    };
  }

  handler(e: KeyboardEvent) {
    console.log(e);
    if (e.ctrlKey && e.key === 'z') {
      this.history.back();
    }
  }
}
