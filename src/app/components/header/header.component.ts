import { Component, OnInit } from '@angular/core';
import {HotkeysDialogComponent} from './dialogs/hotkeys-dialog/hotkeys-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'drawer-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private dialog: MatDialog) { }

  showHotKeys() {
    this.dialog.open(HotkeysDialogComponent);
  }


}
