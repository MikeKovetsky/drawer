import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {
  MatButtonModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule
} from '@angular/material';

import {AppComponent} from './app.component';
import {CanvasComponent} from './components/canvas/canvas.component';
import {HistoryComponent} from './components/history/history.component';
import {HistoryEventComponent} from './components/history/history-event/history-event.component';
import {CursorPositionComponent} from './components/header/cursor-position/cursor-position.component';
import {SelectionComponent} from './components/selection/selection.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {PointPositionComponent} from './components/point-position/point-position.component';
import {NewCircleComponent} from './components/toolbar/new-circle/new-circle.component';
import {NewLineComponent} from './components/toolbar/new-line/new-line.component';
import {NewCurveComponent} from './components/toolbar/new-curve/new-curve.component';

import {DrawerService} from "./services/drawer.service";
import {CursorPositionService} from "./services/cursor-position.service";
import {HistoryService} from "./services/history.service";
import {SelectionService} from "./services/selection.service";
import {HelpersService} from "./services/helpers.service";
import {ShapesService} from "./services/shapes.service";
import {TransformationsComponent} from './components/transformations/transformations.component';
import {SpecificComponent} from './components/specific/specific.component';
import {AnchorComponent} from './components/anchor/anchor.component';
import {ControlPointsService} from "./services/control-points.service";
import {FractalsService} from "./services/fractals.service";
import {HotKeysService} from './services/hotkeys.service';
import {ToolsService} from './services/tools.service';
import { SplitPointComponent } from './components/split-point/split-point.component';
import { HeaderComponent } from './components/header/header.component';
import { HotkeysDialogComponent } from './components/header/dialogs/hotkeys-dialog/hotkeys-dialog.component';
import {PavementService} from './services/pave.service';
import {ScaleService} from './services/scale.service';
import {TransformationsService} from './components/transformations/transformations.service';


@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    HistoryComponent,
    HistoryEventComponent,
    CursorPositionComponent,
    SelectionComponent,
    ToolbarComponent,
    PointPositionComponent,
    NewCircleComponent,
    NewLineComponent,
    NewCurveComponent,
    TransformationsComponent,
    SpecificComponent,
    AnchorComponent,
    SplitPointComponent,
    HeaderComponent,
    HotkeysDialogComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    // MATERIAL
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogModule
  ],
  providers: [
    DrawerService,
    HistoryService,
    CursorPositionService,
    SelectionService,
    HelpersService,
    ShapesService,
    ControlPointsService,
    FractalsService,
    HotKeysService,
    ToolsService,
    PavementService,
    ScaleService,
    TransformationsService
  ],
  entryComponents: [
    HotkeysDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
