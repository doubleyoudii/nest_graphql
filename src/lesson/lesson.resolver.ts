import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { AssignStudentInput } from './input/assign-student.input';
import { CreateLessonInput } from './input/create-lesson.input';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(private lessonService: LessonService) {}
  @Query((returns) => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonService.getLessonById(id);
  }

  @Query((returns) => [LessonType])
  lessons() {
    return this.lessonService.getLessons();
  }

  @Mutation((returns) => LessonType)
  createLesson(@Args('lessonCreate') lessonCreate: CreateLessonInput) {
    return this.lessonService.createLesson(lessonCreate);
  }

  @Mutation((returns) => LessonType)
  assignedStudentsToLesson(
    @Args('studentAssign') studentAssign: AssignStudentInput,
  ) {
    return this.lessonService.assignedStudentToLesson(studentAssign);
  }
}
