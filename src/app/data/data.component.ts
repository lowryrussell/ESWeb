import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from '../shared';

@Component({
  selector: 'app-data-page',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  constructor(
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    console.log("Data init called");
    console.log(this.dataService.getNodeData());
    console.log("Data should be here");
  }
}
