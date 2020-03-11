import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { throwError } from 'rxjs';

import { Device } from "../devices-list/device.model";
import { Policy } from "./policies-list/policies.model";
import { Enterprise } from "./enterprise-details/enterprise.model";

@Injectable()
export class FLASKAPIService {
  constructor(private http: HttpClient) {}

  private static _handleError(err: HttpErrorResponse | any) {
    return throwError(
      err.message || "Error: Unable to complete request."
    );
  }
  getDevicesE(enterprise_name): Observable<Device[]> {
    //doit etre localhost:5000/entreprise_name/devices
    return this.http
      .get<Device[]>(`http://localhost:5000/` + enterprise_name + `/devices`)
      .pipe(catchError(FLASKAPIService._handleError));
  }
  // GET list of public, future events
  getDevices(): Observable<Device[]> {
    //doit etre localhost:5000/entreprise_name/devices
    return this.http
      .get<Device[]>(`http://localhost:5000/devices`)
      .pipe(catchError(FLASKAPIService._handleError));
  }
  getPolicies(): Observable<Policy[]> {
    return this.http
      .get<Policy[]>(`http://localhost:5000/policies`)
      .pipe(catchError(FLASKAPIService._handleError));
  }
  getEnterprise(): Observable<Enterprise[]> {
    return this.http
      .get<Enterprise[]>(`http://localhost:5000/enterprise`)
      .pipe(catchError(FLASKAPIService._handleError));
  }
}
