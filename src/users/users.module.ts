import { Module } from '@nestjs/common';

import { UsersController } from '@users/handler/users.controller';

import { UsersGetUseCase } from '@users/use-case/users-get.use-case';
import { UsersWriteUseCase } from '@users/use-case/users-write.use-case';

import { JsonDataService } from '@users/services/JsonDataService';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersGetUseCase, UsersWriteUseCase, JsonDataService],
})
export class UsersModule {}
