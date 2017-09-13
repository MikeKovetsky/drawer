import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MdButtonModule, MdCheckboxModule, MdFormFieldModule, MdInputModule, MdSelectModule} from "@angular/material";

import {AppComponent} from './app.component';
import {CanvasComponent} from './components/canvas/canvas.component';
import {HistoryComponent} from './components/history/history.component';
import {HistoryEventComponent} from './components/history/history-event/history-event.component';
import {CursorPositionComponent} from './components/cursor-position/cursor-position.component';
import {SelectionComponent} from './components/selection/selection.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import { PointPositionComponent } from './components/point-position/point-position.component';
import { NewCircleComponent } from './components/toolbar/new-circle/new-circle.component';
import { NewLineComponent } from './components/toolbar/new-line/new-line.component';
import { NewCurveComponent } from './components/toolbar/new-curve/new-curve.component';

import {DrawerService} from "./services/drawer.service";
import {CursorPositionService} from "./services/cursor-position.service";
import {HistoryService} from "./services/history.service";
import {SelectionService} from "./services/selection.service";
import {HelpersService} from "./services/helpers.service";
import {ShapesService} from "./services/shapes.service";

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
    NewCurveComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    // MATERIAL
    MdFormFieldModule,
    MdInputModule,
    MdButtonModule,
    MdCheckboxModule,
    MdSelectModule
  ],
  providers: [
    DrawerService,
    HistoryService,
    CursorPositionService,
    SelectionService,
    HelpersService,
    ShapesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
