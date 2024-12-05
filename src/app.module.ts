import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsModule } from './modules/students/students.module';
import { PostModule } from './modules/posts/post.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest'), 
    StudentsModule,
    PostModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
