import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NodeService, SensorService } from '../shared';

@Component({
  selector: 'app-data-page',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  constructor(
    private router: Router,
    private nodeService: NodeService,
    private sensorService: SensorService
  ) {}

  ngOnInit() {
    console.log("Data init called");
    this.nodeService.getNodeData();
    //this.sensorService.getSensorData();
    console.log("Data should be here");
  }
}
