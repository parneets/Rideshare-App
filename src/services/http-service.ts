import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class httpService {
    constructor(private http: Http) { }

    shapeRequest() {
        var headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    makeGetRequest(url): Observable<any> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get(url, {
            headers: headers
        })
        .map((response: Response) => {
            return response.json();
        });
    }

    makePostRequest(url, data): Observable<any> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(url, data, {
            headers: headers
        })
        .map((response: Response) => {
            return response.json();
        });
    }

    makeNoResponsePutRequest(url, data): Observable<any>{
        var body = JSON.stringify(data);
        var headers = this.shapeRequest();
        return this.http.put(url, body, {
                headers: headers
            });
    }
}