import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Message } from '../../models/message';
import { PromptService } from './prompt.service';

@Component({
  selector: 'app-prompt',
  standalone: true,
  imports: [
    MatListModule,
    NgForOf,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgIf,
    FormsModule,
  ],
  templateUrl: './prompt.component.html',
  styleUrl: './prompt.component.scss',
})
export class PromptComponent {
  messages: Message[] = [];
  newMessage: string = '';
  constructor(private promptService: PromptService) {}
  sendMessage() {
    if (this.newMessage.trim() !== '') {
      let message: Message = {
        id: this.messages.length + 1,
        text: this.newMessage,
        timestamp: new Date(),
        user: localStorage.getItem('currentUserId') || 'Anonymous',
      };
      this.messages.push(message);
      this.newMessage = '';
      this.promptService
        .getAnswerForPrompt(message.text, 'Chapter 11', 1)
        .subscribe((response) => {});
    }
  }

  clearMessage() {
    this.newMessage = '';
  }
}
