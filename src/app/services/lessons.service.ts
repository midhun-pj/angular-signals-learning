import { inject, Injectable } from '@angular/core';
import { Lesson } from '../models/lesson.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { GetLessonsResponse } from '../models/get-lessons.response';
import { environment } from '../../environments/environment';

type lesson = {
  courseId?: string;
  query?: string;
};

@Injectable({
  providedIn: 'root',
})
export class LessonsService {
  env = environment;

  http = inject(HttpClient);

  async loadLessons(config: lesson): Promise<Lesson[]> {
    let params = new HttpParams();

    const { courseId, query } = config;

    if (courseId) {
      params = params.set('courseId', courseId);
    }
    if (query) {
      params = params.set('query', query);
    }

    const response = await firstValueFrom(
      this.http.get<GetLessonsResponse>(`${this.env.apiRoot}/search-lessons`, {
        params,
      })
    );
    return response.lessons;
  }

  async saveLesson(lessonId: string,changes: Partial<Lesson>): Promise<Lesson> {
    const saveLesson$ = this.http.put<Lesson>(
      `${this.env.apiRoot}/lessons/${lessonId}`,
      changes
    );
    return firstValueFrom(saveLesson$);
  }
}
