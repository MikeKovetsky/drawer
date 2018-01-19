import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {
  MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSelectModule
} from "@angular/material";

import {AppComponent} from './app.component';
import {CanvasComponent} from './components/canvas/canvas.component';
import {HistoryComponent} from './components/history/history.component';
import {HistoryEventComponent} from './components/history/history-event/history-event.component';
import {DrawerService} from "./services/drawer.service";
import {HistoryService} from "./services/history.service";
import {HelpersService} from "./services/helpers.service";
import {FractalsService} from "./services/fractals.service";
import { TransformationsComponent } from './components/transformations/transformations.component';


@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    HistoryComponent,
    HistoryEventComponent,
    TransformationsComponent
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
    MatSelectModule
  ],
  providers: [
    DrawerService,
    HistoryService,
    HelpersService,
    FractalsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
