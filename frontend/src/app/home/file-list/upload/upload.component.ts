import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {UploadService} from "./upload.service";
import {MatDialog} from "@angular/material/dialog";
import {
  InvalidUploadFileTypeDialogComponent
} from "../../../dialogs/invalid-upload-file-type-dialog/invalid-upload-file-type-dialog.component";
import {PromptComponent} from "../../prompt/prompt.component";

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    NgIf,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    PromptComponent
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  selectedFile: File | null = null;
  uploadProgress: number = 0;
  allowedFileType: string = 'application/epub+zip'

  constructor(private service: UploadService, private dialog: MatDialog) {}

  onFileSelected($event: Event): void {
    console.log('File selected')
    let inputElement: HTMLInputElement = $event.target as HTMLInputElement;
    if (!inputElement.files) {
      return;
    }

    //TODO: Handle the case in which the same file is reuploaded.

    let file: File = inputElement.files[0];
    if (file.type !== this.allowedFileType) {
      console.error('Invalid file type:', file.type);
      this.openInvalidFileTypeDialog();
      return;
    }

    this.selectedFile = file;
    console.log('Uploading:', this.selectedFile.name);

    this.service.uploadFile(this.selectedFile).subscribe(
      event => {
        if (event.type === 1) {
          console.log('Upload started');
        } else if (event.type === 3) {
          // this.uploadProgress = Math.round(100 * event.loaded / event.total);
          console.log('Upload progress:', this.uploadProgress);
        } else if (event.type === 4) {
          console.log('Upload complete');
        }
      },
      error => {
        console.error('Upload failed:', error);
      }
    );

    this.selectedFile = null;
  }

  openInvalidFileTypeDialog(): void {
    console.log('Opening invalid file type dialog')
    this.dialog.open(InvalidUploadFileTypeDialogComponent, {
      width: '400px'
    });
  }
}
