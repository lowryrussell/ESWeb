import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NodeService, SensorService, Node, Sensor } from '../shared';

@Component({
  selector: 'app-data-page',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  node: Node[];
  sensor: Sensor[];

  constructor(
    private router: Router,
    private nodeService: NodeService,
    private sensorService: SensorService
  ) {}

  ngOnInit() {
    this.node = this.nodeService.getNodeData();
    this.sensor = this.sensorService.getSensorData();
    console.log(this.node);
    console.log(this.sensor[0]);
    /*  Access individual node information with "this.node[array position].attribute"
        Full list of attributes can be found in /shared/models/node.model

        Accessing sensor Data
          If you want the nodeId for the sensor or the timestamp, use:
            "this.sensor[array position].pk.attribute"
          If you want a sensor reading, use
            "this.sensor[array position].sensorReading#"
    */
  }
}
