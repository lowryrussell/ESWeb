import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

import { ApiService } from './api.service';
import { Node, User } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class NodeService {
  node: Node[];

  constructor (
    private apiService: ApiService,
    private http: HttpClient
  ) {}

  // Retrieve all node entries in Node table
  getNodeData() {
    return new Promise((resolve, reject) => {
      this.apiService.get('/node').subscribe(data =>  {
        this.node = data
        resolve(this.node);
      });
    });
  }
}
