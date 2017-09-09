import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {CanvasComponent} from './canvas/canvas.component';
import {HistoryComponent} from './history/history.component';
import {HistoryItemComponent} from './history/history-item/history-item.component';
import {CursorPositionComponent} from './cursor-position/cursor-position.component';

import {DrawerService} from "./services/drawer.service";
import {CursorPositionService} from "./services/cursor-position.service";

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    HistoryComponent,
    HistoryItemComponent,
    CursorPositionComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule
  ],
  providers: [
    DrawerService,
    CursorPositionService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
