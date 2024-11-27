import { IsNotEmpty, isNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateStudentDto{

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string

    @IsString()
    @MaxLength(10)
    @IsNotEmpty()
    readonly rollNumber: string

    @IsNumber()
    @IsNotEmpty()
    readonly class: number

    @IsString()
    @MaxLength(10)
    @IsNotEmpty()
    readonly gender: string

}