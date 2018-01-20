import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { DrawerService } from "../../services/drawer.service";
import { HistoryService } from "../../services/history.service";
import { CANVAS_CONFIG } from "../../configs/canvas-config";

import { DrawerCanvas } from "../../models/canvas.model";
import { HelpersService } from "../../services/helpers.service";
import { CUBE } from '../../configs/cube';
import { Drawer3dService } from '../../services/drawer3d.service';

@Component({
  selector: 'drawer-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  @ViewChild('canvas') domCanvas: ElementRef;
  canvas: DrawerCanvas;
  transformationsShown = false;

  constructor(private drawer: DrawerService,
              private drawer3d: Drawer3dService,
              private history: HistoryService) {
  }

  ngOnInit() {
    this.canvas = new DrawerCanvas(this.domCanvas.nativeElement, CANVAS_CONFIG.width, CANVAS_CONFIG.height, CANVAS_CONFIG.vectorLength);
    this.canvas = this.drawer.render(this.canvas);
    this.drawCube();

    this.history.needsRendering$.asObservable().subscribe((bool: Boolean) => {
      if (bool) {
        this.canvas = new DrawerCanvas(this.domCanvas.nativeElement, CANVAS_CONFIG.width, CANVAS_CONFIG.height, CANVAS_CONFIG.vectorLength);
        this.canvas = this.drawer.render(this.canvas);
      }
    });
  }

  drawCube() {
    this.drawer3d.drawPoints(CUBE);
  }
}
