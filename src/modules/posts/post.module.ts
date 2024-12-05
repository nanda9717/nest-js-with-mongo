import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PostSchema } from "./post.schema";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { StudentSchema } from "../students/student.schema";


@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'Post', schema: PostSchema},
            {name:'Student',schema:StudentSchema},
        ])
    ],
    controllers: [PostController],
    providers: [PostService]
})
export class PostModule{}
