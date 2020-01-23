import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
  })
  export class BicycleStationService {

    constructor(private httpClient: HttpClient) {}

    getBicycleStations() : Observable<any> {
        return this.httpClient.get<any>('http://www.poznan.pl/mim/plan/map_service.html?mtype=pub_transport&co=stacje_rowerowe');
    }
  }