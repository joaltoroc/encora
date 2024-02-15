import { Injectable } from '@nestjs/common';

import type { Paginated, PaginateQuery } from '@shared/paginate';

import { JsonDataService } from '@users/services/JsonDataService';

import type { UserType } from '@users/types';

@Injectable()
export class UsersGetUseCase {
  constructor(private readonly jsonDataService: JsonDataService) {}

  public async handler(query: PaginateQuery): Promise<Paginated<UserType>> {
    const data = await this.jsonDataService.GetData();

    return {
      data: this.paginate(data, query.size, query.page),
      meta: { ...query, total: data.length },
    };
  }

  private paginate(data: UserType[], page_size: number, page_number: number) {
    return data.slice((page_number - 1) * page_size, page_number * page_size);
  }
}
