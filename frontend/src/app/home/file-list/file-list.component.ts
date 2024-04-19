import {Component, OnDestroy} from '@angular/core';
import {UploadComponent} from "./upload/upload.component";
import {MatListModule} from "@angular/material/list";
import {NgForOf} from "@angular/common";
import {EBook} from "../../models/ebook";
import {FileListService} from "./file-list.service";
import {Subscription} from "rxjs";
import {UploadService} from "./upload/upload.service";
import {MatButtonModule} from "@angular/material/button";


@Component({
  selector: 'app-file-list',
  standalone: true,
  imports: [
    UploadComponent,
    MatListModule,
    NgForOf,
    MatButtonModule
  ],
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.scss'
})
export class FileListComponent implements OnDestroy {
  files: EBook[] = []
  fileUploadSubscription: Subscription;

  constructor(private service: FileListService, private uploadService: UploadService) {
    this.fileUploadSubscription = this.uploadService.uploadComplete$.subscribe(
      () => {
        this.service.getDocumentsForUser().subscribe(
          (files: EBook[]) =>
          {
            console.log('Files:', files);
            this.files = files;
          }
        );
      }
    );

    this.uploadService.notifyUploadComplete()
  }

  ngOnDestroy() {
    this.fileUploadSubscription.unsubscribe();
  }
}
