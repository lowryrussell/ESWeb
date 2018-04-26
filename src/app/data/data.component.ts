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
    this.sensor = this.sensorService.getSensorData();


    var altitudeArr = [];
    var humidityArr = [];
    var temperatureArr = [];
    var pressureArr = [];
    var timestampArr = [];

    (this.sensor).forEach(function(child) {
      //console.log((child.nodeId).toString())
      if((child.nodeId).toString() == "8c207df6-2291-451e-baff-d6b053e8c9e4") {
        console.log(child)
        var date = new Date(child.timestamp);

        // Month part from the timestamp
        var month = date.getMonth()+1;
        // Day part from the timestamp
        var day = date.getDate();
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        // Will display time in MM-dd HH:mm:ss format
        var formattedTime = month + '-' + day + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        timestampArr.push(formattedTime)
        altitudeArr.push(child.altitude)
        humidityArr.push(child.humidity)
        pressureArr.push(child.pressure)
        temperatureArr.push(child.temp)
      }
    })

    this.lineChartData = [
      {data: altitudeArr, label: 'Altitude'},
      {data: humidityArr, label: 'Humidity'},
      {data: pressureArr, label: 'Pressure'},
      {data: temperatureArr, label: 'Temperature'}
    ];

    this.lineChartLabels = timestampArr
  }
  // lineChart
  public lineChartData:Array<any> = [
    {data: [], label: 'Altitude'},
    {data: [], label: 'Humidity'},
    {data: [], label: 'Pressure'},
    {data: [], label: 'Temperature'}
  ];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);  }
}
