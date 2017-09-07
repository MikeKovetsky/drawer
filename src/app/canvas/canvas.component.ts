import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DrawerService} from "../services/drawer.service";

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  @ViewChild('canvas') el: ElementRef;
  canvas: Canvas;
  context;

  private readonly CANVAS_CONFIG = {
    width: 600,
    height: 100,
    vectorLength: 20
  };

  constructor(private drawerService: DrawerService) { }

  ngOnInit() {
    this.canvas = new Canvas(this.el.nativeElement, this.CANVAS_CONFIG.width, this.CANVAS_CONFIG.height, this.CANVAS_CONFIG.vectorLength);
    this.context = this.canvas.getContext();
  }

}
