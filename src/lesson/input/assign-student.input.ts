import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AssignStudentInput {
  @IsUUID()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => ID)
  lessonId: string;

  @IsUUID('4', { each: true })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [ID])
  studentIds: string[];
}
