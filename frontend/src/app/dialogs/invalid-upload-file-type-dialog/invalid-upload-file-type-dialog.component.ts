import { Component } from '@angular/core';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-invalid-upload-file-type-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './invalid-upload-file-type-dialog.component.html',
  styleUrl: './invalid-upload-file-type-dialog.component.scss'
})
export class InvalidUploadFileTypeDialogComponent {

  constructor(public dialogRef: MatDialogRef<InvalidUploadFileTypeDialogComponent>) { }

  close() {
    this.dialogRef.close();
  }
}
