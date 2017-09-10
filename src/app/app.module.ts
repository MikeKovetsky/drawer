import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MdButtonModule, MdCheckboxModule, MdFormFieldModule, MdInputModule} from "@angular/material";

import {AppComponent} from './app.component';
import {CanvasComponent} from './components/canvas/canvas.component';
import {HistoryComponent} from './components/history/history.component';
import {HistoryEventComponent} from './components/history/history-event/history-event.component';
import {CursorPositionComponent} from './components/cursor-position/cursor-position.component';
import {SelectionComponent} from './components/selection/selection.component';

import {DrawerService} from "./services/drawer.service";
import {CursorPositionService} from "./services/cursor-position.service";
import {HistoryService} from "./services/history.service";
import {SelectionService} from "./services/selection.service";
import {HelpersService} from "./services/helpers.service";

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    HistoryComponent,
    HistoryEventComponent,
    CursorPositionComponent,
    SelectionComponent
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
    MdCheckboxModule
  ],
  providers: [
    DrawerService,
    HistoryService,
    CursorPositionService,
    SelectionService,
    HelpersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
