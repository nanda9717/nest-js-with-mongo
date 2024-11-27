import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IStudent } from './student.interface';
import { Model } from 'mongoose';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
    constructor(@InjectModel('Student') private studentModel : Model<IStudent>){

    }

    // Creating a student
    async createStudent(createStudentDto: CreateStudentDto):Promise<IStudent>{
        const newStudent = await new this.studentModel(createStudentDto);
        return newStudent.save();
    }

    async getAllStudents():Promise<any>{
        const studentData = await this.studentModel.find();
        if(!studentData || studentData?.length == 0){
            throw new NotFoundException('Student data not found');
        }
        return studentData;
    }

    async getStudentById(studentId: string):Promise<IStudent>{
        const student = await this.studentModel.findById(studentId);
        if(!student){
            throw new NotFoundException(`Student #${studentId} not found`)
        }
        return student;
    }

    async deleteStudent(studentId: string):Promise<IStudent>{
        const deletedStudent = await this.studentModel.findByIdAndDelete(studentId);
        if(!deletedStudent){
            throw new NotFoundException(`Student #${studentId} not found`)
        }
        return deletedStudent;
    }

    async updateStudent(studentId: string,updatedStudentDto: UpdateStudentDto):Promise<IStudent>{
        const updatedStudent = await this.studentModel.findByIdAndUpdate(studentId, updatedStudentDto,{new:true});
        if(!updatedStudent){
            throw new NotFoundException(`Student #${studentId} not found`);
        }
        return updatedStudent;
    }


}
