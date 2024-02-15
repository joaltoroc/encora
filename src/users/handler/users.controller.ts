import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { Paginate, PaginateQuery, Paginated } from '@shared/paginate';

import { UserDto } from '@users/models/userDto';

import { UsersGetUseCase } from '@users/use-case/users-get.use-case';
import { UsersWriteUseCase } from '@users/use-case/users-write.use-case';

import type { Response, UserType } from '@users/types';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(
    private readonly userGetUseCase: UsersGetUseCase,
    private readonly usersWriteUseCase: UsersWriteUseCase,
  ) {}

  @Get()
  getUsers(@Paginate() query: PaginateQuery): Promise<Paginated<UserType>> {
    return this.userGetUseCase.handler(query);
  }

  @Post()
  @ApiBody({ type: [UserDto] })
  postUser(@Body() user: UserDto): Promise<Response> {
    return this.usersWriteUseCase.handler(user);
  }
}
