import { Component } from '@angular/core';
import {HotKeysService} from './services/hotkeys.service';

@Component({
  selector: 'drawer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private hotKeys: HotKeysService) {
      this.hotKeys.init();
    }
}
