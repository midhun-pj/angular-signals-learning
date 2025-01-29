import { Component, inject, input, output } from '@angular/core';
import { Lesson } from '../../models/lesson.model';
// services
import { LessonsService } from '../../services';
import { MessagesService } from '../messages';

@Component({
  selector: 'lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrl: './lesson-detail.component.scss',
})
export class LessonDetailComponent {
  lesson = input.required<Lesson | null>();
  lessonUpdated = output<Lesson>();
  cancel = output();

  lessonsService = inject(LessonsService);
  messagesService = inject(MessagesService);

  onCancel(): void {
    this.cancel.emit();
  }

  async onSave(description: string) {
    try {
      const lesson = this.lesson();
      const updatedLesson = await this.lessonsService.saveLesson(lesson!.id, {
        description,
      });
      this.lessonUpdated.emit(updatedLesson);
    } catch (err) {
      console.error(err);
      this.messagesService.showMessage(`Error saving lesson!`, 'error');
    }
  }
}
