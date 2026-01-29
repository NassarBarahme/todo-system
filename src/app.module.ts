import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/todoapp'),
    UsersModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
