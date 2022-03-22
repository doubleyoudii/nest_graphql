import { Resolver } from '@nestjs/graphql';
import { StudentType } from './student.type';

@Resolver((of) => StudentType)
export class StudentResolver {}
