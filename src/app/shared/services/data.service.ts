import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

import { ApiService } from './api.service';
import { Node } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class DataService {
  constructor (
    private apiService: ApiService,
    private http: HttpClient
  ) {}

  getNodeData(): Observable<[any]> {
    return this.apiService.get('/node').subscribe(data => console.log(data));
  }

}
