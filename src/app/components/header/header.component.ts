import { Component } from '@angular/core';
import {HotkeysDialogComponent} from './dialogs/hotkeys-dialog/hotkeys-dialog.component';
import {MatDialog} from '@angular/material';
import {ToolsService} from '../../services/tools.service';
import {HistoryService} from '../../services/history.service';
import {ShapesService} from '../../services/shapes.service';
import {PavementService} from '../../services/pave.service';

@Component({
  selector: 'drawer-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private dialog: MatDialog,
              public history: HistoryService,
              public tools: ToolsService,
              public shapes: ShapesService,
              public pavement: PavementService) { }

  showHotKeys() {
    this.dialog.open(HotkeysDialogComponent);
  }


}
