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

@Component({
  selector: 'app-file-list',
  standalone: true,
  imports: [
    UploadComponent,
    MatListModule,
    NgForOf,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.scss',
})
export class FileListComponent implements OnDestroy {
  files: EBook[] = [];
  currentFileName: string = '';
  currentFileId: number = 0;
  fileUploadSubscription: Subscription;

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

    this.uploadService.notifyUploadComplete();
  }
  setCurrentFile(id: number, name: string) {
    this.currentFileName = name;
    this.currentFileId = id;
  }
  ngOnDestroy() {
    this.fileUploadSubscription.unsubscribe();
  }
}
