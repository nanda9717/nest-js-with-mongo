import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Post } from "./post.schema";
import { CreatePostDto } from "./dto/create-post.dto";
import { Student } from "../students/student.schema";

@Injectable()
export class PostService{

    constructor(
        @InjectModel('Post') private postModel: Model<Post>,
        @InjectModel('Student') private studentModel: Model<Student>
    ){}

    async createPost(createPostDto: CreatePostDto){
        const { studentId } = createPostDto;
        const findUser = await this.studentModel.findById(studentId);
        if(!findUser) throw new NotFoundException(`Student #${studentId} not found`);
        const newPost = new this.postModel(createPostDto);
        const savedPost = await newPost.save();
        await findUser.updateOne({
            $push: {
                posts: savedPost._id
            }
        });
        return savedPost;
    }

    findByPostById(){

    }

}