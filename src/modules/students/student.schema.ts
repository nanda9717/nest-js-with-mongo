import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { StudentProfile } from "./studentProfile.schema";
import { Post } from "../posts/post.schema";

@Schema()
export class Student{

    @Prop({ required: true})
    name: string

    @Prop({ unique: true, required: true})
    rollNumber: string

    @Prop({ required: true })
    class: number

    @Prop({required: false})
    gender?: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'StudentProfile'})
    profile?: StudentProfile

    @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}] })
    posts: Post[]

}

export const StudentSchema = SchemaFactory.createForClass(Student);