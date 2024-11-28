import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { response } from 'express';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentsController {
    constructor(private studentService: StudentsService){

    }

    @Post()
    async createStudent(@Res() response, @Body() createStudentDto: CreateStudentDto){
        try{
            const newStudent = await this.studentService.createStudent(createStudentDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Student has been created successfully',
                newStudent
            })
        }catch(err){
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: "Error Student not created",
                error: 'Bas Request'
            })
        }
    }

    @Get()
    async getAllStudents(@Res() response){
        try{
            const students = await this.studentService.getAllStudents();
            return response.status(HttpStatus.OK).json({
                message: "All student data found successfully",
                students
            })
        }catch(err){
            return response.status(err.status).json(err.response)
        }
    }

    @Put('/:id')
    async updateStudent(@Res() response, @Param('id') studentId:string, @Body() updateStudentDto: UpdateStudentDto){
        try{
            const updatedStudent = await this.studentService.updateStudent(studentId, updateStudentDto);
            return response.status(HttpStatus.OK).json({
                message: "Student has been successfully updated",
                updatedStudent
            })
        }catch(err){
            return response.status(err.status).json(err.response)
        }
    }

    @Delete('/:id')
    async deleteStudent(@Res() response, @Param('id') studentId:string){
        try{
            const deletedStudent = await this.studentService.deleteStudent(studentId);
            return response.status(HttpStatus.OK).json({
                message: "Student deleted successfully",
                deletedStudent
            })
        }catch(err){
            return response.status(err.status).json(err.response) 
        }
    }

    @Get('/:id')
    async getStudentById(@Res() response, @Param('id') studentId:string){
        try{
            const student = await this.studentService.getStudentById(studentId);
            return response.status(HttpStatus.OK).json({
                message: "Student found successfully",
                student
            })
        }catch(err){
            return response.status(err.status).json(err.response)
        }
    }

}
