import { Component } from '@angular/core';
import {UploadComponent} from "./upload/upload.component";
import {MatListModule} from "@angular/material/list";
import {NgForOf} from "@angular/common";
import {EBook} from "../../models/ebook";


@Component({
  selector: 'app-file-list',
  standalone: true,
  imports: [
    UploadComponent,
    MatListModule,
    NgForOf
  ],
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.scss'
})
export class FileListComponent {
  files: EBook[] = []


}
