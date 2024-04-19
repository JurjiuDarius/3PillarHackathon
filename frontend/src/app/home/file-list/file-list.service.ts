import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileListService {

  private apiUrl = environment.apiURL;

  currentDocumentId: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentChapter: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {  }

  getDocumentsForUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/document/`);
  }

  getChaptersForDocument(documentId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/document/${documentId}/chapters`);
  }

  setCurrentDocumentId(documentId: number): void {
    this.currentDocumentId.next(documentId);
  }

  setCurrentChapter(chapter: string): void {
    this.currentChapter.next(chapter);
  }
}
