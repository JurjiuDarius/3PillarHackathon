import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, Subject, Subscription} from "rxjs";
import {EBook} from "../../../models/ebook";

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private apiUrl = environment.apiURL;

  private uploadComplete = new Subject<void>();
  uploadComplete$ = this.uploadComplete.asObservable();

  private chaptersFetched = new Subject<void>();
  chaptersFetched$ = this.chaptersFetched.asObservable();

  constructor(private http: HttpClient) {  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/document/upload/`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  notifyUploadComplete() {
    this.uploadComplete.next();
  }

  notifyChaptersFetched() {
    this.chaptersFetched.next();
  }
}
