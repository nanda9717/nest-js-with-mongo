import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from './student.schema';
import { StudentProfileSchema } from './studentProfile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name:'Student',schema:StudentSchema},
      {name: 'StudentProfile', schema: StudentProfileSchema}
    ])
  ],
  controllers: [StudentsController],
  providers: [StudentsService]
})
export class StudentsModule {}
