import { Injectable, EventEmitter } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TwitterHandleService {

    handlesChanged: EventEmitter<any> = new EventEmitter<any>();

    constructor(private http: Http) {
        console.log('Mongo db twitter handle service initialised');
    }

    getTwitterHandles() {
        return this.http.get('http://localhost:3000/api/tasks')
            .map(res => res.json());
    }


  PostTwitterHandle(handle)
  {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/tasks', JSON.stringify(handle), {headers: headers}).map(res =>
    {
        res.json();
        this.handlesChanged.emit();
    }).subscribe();
  }

  DeleteTwitterHandle(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete('http://localhost:3000/api/tasks/' + id, { headers: headers}).map(res =>
    {
        res.json();
        this.handlesChanged.emit();
    }).subscribe();

  }
}
