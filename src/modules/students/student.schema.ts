import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Student{

    @Prop()
    name: string

    @Prop()
    rollNumber: string

    @Prop()
    class: number

    @Prop()
    gender: string

}

export const StudentSchema = SchemaFactory.createForClass(Student);