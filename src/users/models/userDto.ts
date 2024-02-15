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
  @ApiProperty({ minimum: 6 })
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9\s]+$/)
  @MinLength(6)
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsOptional()
  address?: string;
}
