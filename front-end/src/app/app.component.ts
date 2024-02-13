import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { FileSelectEvent, FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FileUploadModule, CommonModule],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  uploadedFiles: any[] = [];
  selectedFiles: any[] = [];

  constructor(private messageService: MessageService, private service: AppService) {}

  onUpload(event: FileUploadHandlerEvent): void {
      for(let file of event.files) {
          this.uploadedFiles.push(file);
      }

      this.service.postFile(this.uploadedFiles).subscribe({
        next: () => {
          this.messageService.add({severity: 'success', summary: 'File Uploaded', detail: ''})
        },
        error: (e) => console.error('error: ', e),
        complete: () => {}
      });
  }

  aoSelecionar(event: FileSelectEvent): void {
    this.selectedFiles.push(event);
  }

  aoLimpar(): void {
    this.selectedFiles = [];
  }
}