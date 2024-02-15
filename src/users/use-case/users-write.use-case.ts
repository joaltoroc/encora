import { ConflictException, Injectable } from '@nestjs/common';

import { JsonDataService } from '@users/services/JsonDataService';

import type { UserType } from '@users/types';

@Injectable()
export class UsersWriteUseCase {
  constructor(private readonly jsonDataService: JsonDataService) {}

  public async handler(user: UserType): Promise<void> {
    const data = await this.jsonDataService.GetData();

    if (data.some(({ email }) => user.email === email)) {
      throw new ConflictException('Email already exists');
    }

    await this.jsonDataService.WriteData([...data, user]);
  }
}
