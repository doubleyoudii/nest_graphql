import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { StudentService } from 'src/student/student.service';
import { AssignStudentInput } from './input/assign-student.input';
import { CreateLessonInput } from './input/create-lesson.input';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonService.getLessonById(id);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [LessonType])
  lessons() {
    return this.lessonService.getLessons();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => LessonType)
  createLesson(@Args('lessonCreate') lessonCreate: CreateLessonInput) {
    return this.lessonService.createLesson(lessonCreate);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => LessonType)
  assignedStudentsToLesson(
    @Args('studentAssign') studentAssign: AssignStudentInput,
  ) {
    return this.lessonService.assignedStudentToLesson(studentAssign);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return this.studentService.findStudents(lesson.students);
  }
}
