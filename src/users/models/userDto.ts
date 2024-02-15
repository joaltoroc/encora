import { ApiProperty } from '@nestjs/swagger';

import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  MinLength,
} from 'class-validator';

import type { UserType } from '@users/types';

export class UserDto implements UserType {
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9\s]+$/)
  @MinLength(6)
  @ApiProperty({
    minimum: 6,
  })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsOptional()
  @ApiProperty()
  address?: string;
}
