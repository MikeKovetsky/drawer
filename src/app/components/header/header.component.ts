import { Component } from '@angular/core';
import {HotkeysDialogComponent} from './dialogs/hotkeys-dialog/hotkeys-dialog.component';
import {MatDialog} from '@angular/material';
import {ToolsService} from '../../services/tools.service';

@Component({
  selector: 'drawer-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private dialog: MatDialog, public tools: ToolsService) { }

  showHotKeys() {
    this.dialog.open(HotkeysDialogComponent);
  }


}
