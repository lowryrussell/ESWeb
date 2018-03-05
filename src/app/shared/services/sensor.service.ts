import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

import { ApiService } from './api.service';
import { Sensor } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class SensorService {
  sensor: Sensor[];

  constructor (
    private apiService: ApiService,
    private http: HttpClient
  ) {}

  getSensorData() {
    this.apiService.get('/sensordata')
    .subscribe(data => this.sensor = data);

    return this.sensor;
  }
}
