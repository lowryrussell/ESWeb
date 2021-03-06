import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

import { ApiService } from './api.service';
import { Sensor } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class SensorService {
  sensor: Sensor[];
  sensorNode: Sensor[] = [];

  constructor (
    private apiService: ApiService,
    private http: HttpClient
  ) {}

  // Retrieve all sensor entries in the sensor data table
  getSensorData() {
    this.apiService.get('/sensordata')
    .subscribe(data => this.sensor = data);

    return this.sensor;
  }

  // Retrieve sensor entries in the sensor data table from the given node
  getSensorDataByNode(nodeId: string) {

    var promiseArr = [];

    return new Promise((resolve, reject) => {
      this.apiService.get('/sensordata/' + nodeId).subscribe(data =>  {
        promiseArr = data;
        resolve(promiseArr)
      });
    });
  }
}
