import { Component, OnDestroy } from '@angular/core';
import { UploadComponent } from './upload/upload.component';
import { MatListModule } from '@angular/material/list';
import { CommonModule, NgForOf } from '@angular/common';
import { EBook } from '../../models/ebook';
import { FileListService } from './file-list.service';
import { Subscription } from 'rxjs';
import { UploadService } from './upload/upload.service';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-file-list',
  standalone: true,
  imports: [
    UploadComponent,
    MatListModule,
    NgForOf,
    MatButtonModule,
    CommonModule,
    MatMenuModule,
  ],
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.scss',
})
export class FileListComponent implements OnDestroy {
  files: EBook[] = [];
  chapters: string[] = [];

  currentFileId: number = 0;
  currentFileName: string = '';
  currentChapter: string = '';

  fileUploadSubscription: Subscription;
  fileChaptersSubscription: Subscription;

  constructor(
    private service: FileListService,
    private uploadService: UploadService
  ) {
    this.fileUploadSubscription = this.uploadService.uploadComplete$.subscribe(
      () => {
        this.service.getDocumentsForUser().subscribe((files: EBook[]) => {
          console.log('Files:', files);
          this.files = files;
        });
      }
    );

    this.fileChaptersSubscription =
      this.uploadService.chaptersFetched$.subscribe(() => {
        this.service
          .getChaptersForDocument(this.currentFileId)
          .subscribe((chapters: any) => {
            console.log('Chapters:', chapters);
            this.chapters = chapters[0];
          });
      });

    this.uploadService.notifyUploadComplete();
  }
  setCurrentFile(id: number, name: string) {
    this.currentFileName = name;
    this.currentFileId = id;
    this.service.setCurrentDocumentId(id);

    this.uploadService.notifyChaptersFetched();
  }
  ngOnDestroy() {
    this.fileUploadSubscription.unsubscribe();
  }

  setCurrentChapter(chapter: string) {
    this.currentChapter = chapter;
    this.service.setCurrentChapter(chapter);
  }
}
