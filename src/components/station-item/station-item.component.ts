import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-station-item',
  templateUrl: './station-item.component.html',
  styleUrls: ['./station-item.component.scss']
})
export class StationItemComponent implements OnInit {
  @Input() station;
  constructor() { }

  ngOnInit() {
  }

}
