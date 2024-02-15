import { Module } from '@nestjs/common';
import { UsersController } from '@users/handler/users.controller';
import { UsersGetUseCase } from './use-case/users-get.use-case';
import { UsersWriteUseCase } from './use-case/users-write.use-case';
import { JsonDataService } from './services/JsonDataService';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersGetUseCase, UsersWriteUseCase, JsonDataService],
})
export class UsersModule {}
