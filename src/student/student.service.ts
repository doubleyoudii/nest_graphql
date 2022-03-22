import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './input/create-student.input';
import { Student } from './student.entity';
import { v4 } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async getStudents(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  async getStudent(id: string): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id },
    });

    return student;
  }

  async createStudent(createStudent: CreateStudentInput): Promise<Student> {
    const { firstName, lastName } = createStudent;
    const student = await this.studentRepository.create({
      id: v4(),
      lastName,
      firstName,
    });
    return await this.studentRepository.save(student);
  }
}
