import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IStudent } from './student.interface';
import { Model } from 'mongoose';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentProfile } from './studentProfile.schema';

@Injectable()
export class StudentsService {
    constructor(
        @InjectModel('Student') private studentModel : Model<IStudent>,
        @InjectModel('StudentProfile') private studentProfileModel: Model<StudentProfile>
    ){}

    // Creating student If we don't have One to One relationship

    // async createStudent(createStudentDto: CreateStudentDto):Promise<IStudent>{
    //     const newStudent = await new this.studentModel(createStudentDto);
    //     return newStudent.save();
    // }

    // Creating a student with one to one relationship
    async createStudent({ profile, ...createStudentDto}: CreateStudentDto):Promise<IStudent>{
        if(profile){
            const newProfile = new this.studentProfileModel(profile);
            const savedProfile = await newProfile.save();
            const newStudent = new this.studentModel({
                ...createStudentDto,
                profile: savedProfile._id
            });
            return newStudent.save();
        }
        const newStudent = new this.studentModel(createStudentDto);
        return newStudent.save();
    }

    async getAllStudents():Promise<any>{
        // If we don't have one to one relationship
        // const studentData = await this.studentModel.find();

        // With one to one relationship
        // const studentData = await this.studentModel.find().populate('profile');

        // With one to many relationship
        const studentData = await this.studentModel.find().populate(['profile','posts']);
        if(!studentData || studentData?.length == 0){
            throw new NotFoundException('Student data not found');
        }
        return studentData;
    }

    async getStudentById(studentId: string):Promise<IStudent>{
        // If we don't have one to one relationship
        // const student = await this.studentModel.findById(studentId);

        // With One to one relationship
        // const student = await this.studentModel.findById(studentId).populate('profile');

        // With One to many relationship
        const student = await this.studentModel.findById(studentId).populate(['profile','posts']);
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
