import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class StudentProfile {

    @Prop({ required: false })
    email: string

    @Prop({ required: false })
    phoneNumber?: number

    @Prop({ required: false})
    avatarUrl?: string

    @Prop({ required: false, default: false })
    receiveNotification?: boolean

}

export const StudentProfileSchema = SchemaFactory.createForClass(StudentProfile);