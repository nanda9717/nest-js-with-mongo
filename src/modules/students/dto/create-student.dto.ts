import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, isNotEmpty, IsNumber, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";

export class CreateStudentProfileDto{

    @IsOptional()
    email?: string;

    @IsOptional()
    @IsNumber()
    phoneNumber?: number;

    @IsOptional()
    avatarUrl?: string;

    @IsOptional()
    @IsBoolean()
    receiveNotification?: boolean
}

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

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateStudentProfileDto)
    profile?: CreateStudentProfileDto

}