import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { Lesson } from './lesson.entity';
import { v4 } from 'uuid';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
  ) {}

  async createLesson(createLesson: CreateLessonDto): Promise<Lesson> {
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
