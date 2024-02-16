import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigList } from "./configs";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class ConfigsService {

    constructor(private http: HttpClient) { }
    getConfigByModelCode(modelCode: string) : Observable<ConfigList>{
        return this.http.get<ConfigList>(`/options/`+modelCode);
      }

  }