import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TwitterHandleService {
    constructor(private http: Http) {
        console.log('Mongo db twitter handle service initialised');
    }

    getTwitterHandles() {
        return this.http.get('http://localhost:3000/api/tasks')
            .map(res => res.json());
    }
}
