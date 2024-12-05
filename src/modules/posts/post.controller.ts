import { Body, Controller, Post } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostService } from "./post.service";

@Controller('posts')
export class PostController{

    constructor(private postService: PostService){}

    @Post()
    createPost(@Body() createPostDto: CreatePostDto){
        return this.postService.createPost(createPostDto);
    }

}