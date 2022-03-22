import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLessonInput } from './input/create-lesson.input';
import { Lesson } from './lesson.entity';
import { v4 } from 'uuid';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
  ) {}

  async getLessonById(id: string): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({ where: { id } });
    return lesson;
  }

  async getLessons(): Promise<Lesson[]> {
    return await this.lessonRepository.find({});
  }

  async createLesson(createLesson: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate } = createLesson;
    const lesson = this.lessonRepository.create({
      id: v4(),
      name,
      startDate,
      endDate,
    });

    return await this.lessonRepository.save(lesson);
  }
}
