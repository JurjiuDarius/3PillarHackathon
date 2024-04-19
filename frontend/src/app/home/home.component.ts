import { Component } from '@angular/core';
import {UploadComponent} from "./file-list/upload/upload.component";
import {PromptComponent} from "./prompt/prompt.component";
import {FileListComponent} from "./file-list/file-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    UploadComponent,
    PromptComponent,
    FileListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
