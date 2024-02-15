import { Injectable } from '@nestjs/common';
import { JsonDataService } from '@users/services/JsonDataService';

import type { Response, UserType } from '@users/types';

@Injectable()
export class UsersWriteUseCase {
  constructor(private readonly jsonDataService: JsonDataService) {}

  public async handler(user: UserType): Promise<Response> {
    const data = await this.jsonDataService.GetData();

    if (data.some(({ email }) => user.email === email)) {
      return {
        statusCode: 409,
        message: ['Email already exists'],
      };
    }

    const write = await this.jsonDataService.WriteData([...data, user]);

    return {
      statusCode: write ? 200 : 500,
    };
  }
}
