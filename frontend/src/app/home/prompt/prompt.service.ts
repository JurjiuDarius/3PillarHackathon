import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PromptService {
  private apiUrl = environment.apiURL;

  constructor(private http: HttpClient) {}

  public getAnswerForPrompt(
    prompt: string,
    chapter: string,
    documentId: number
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/prompt/answer/`, {
      question: prompt,
      documentId,
      chapter,
    });
  }
}
