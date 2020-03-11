import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { throwError } from 'rxjs';

import { Device } from "../devices-list/device.model";
import { Policy } from "./policies-list/policies.model";
import { Enterprise } from "./enterprise-details/enterprise.model";

const URL = "http://localhost:5000/";
const httpOptions = {
  headers: new HttpHeaders ({
  'Content-Type': 'application/json',
  })
};
@Injectable()
export class FLASKAPIService {
  constructor(private http: HttpClient) {}

  private static _handleError(err: HttpErrorResponse | any) {
    return throwError(
      err.message || "Error: Unable to complete request."
    );
  }
  getDevices(enterprise_name): Observable<Device[]> {
    return this.http
      .get<Device[]>(URL + enterprise_name + `/devices`)
      .pipe(catchError(FLASKAPIService._handleError));
  }
  updateDevice(device): Observable<Device[]>{
    return this.http
      .post<Device[]>(URL + device.name, device, httpOptions)
      .pipe(catchError(FLASKAPIService._handleError));
  }
  deleteDevice(device_name): Observable<Device[]>{
    return this.http
      .delete<Device[]>(URL + device_name)
      .pipe(catchError(FLASKAPIService._handleError));
  }
  getPolicies(enterprise_name): Observable<Policy[]> {
    return this.http
      .get<Policy[]>(URL + enterprise_name + `/policies`)
      .pipe(catchError(FLASKAPIService._handleError));
  }
  updatePolicy(policy): Observable<Device[]>{
    return this.http
      .post<Policy[]>(URL + policy.name, policy, httpOptions)
      .pipe(catchError(FLASKAPIService._handleError));
  }
  deletePolicy(policy_name): Observable<Device[]>{
    return this.http
      .delete<Policy[]>(URL + policy_name)
      .pipe(catchError(FLASKAPIService._handleError));
  }
  getEnterprise(enterprise_name): Observable<Enterprise[]> {
    return this.http
      .get<Enterprise[]>(URL + enterprise_name + `/enterprise`)
      .pipe(catchError(FLASKAPIService._handleError));
  }
}
