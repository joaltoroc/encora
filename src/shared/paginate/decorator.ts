import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export interface PaginateQuery {
  page?: number;
  size?: number;
  total?: number;
}

export const Paginate = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): PaginateQuery => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query as Record<string, unknown>;

    return {
      page: query.page ? parseInt(query.page.toString(), 10) : 1,
      size: query.limit ? parseInt(query.limit.toString(), 10) : 10,
    };
  },
);
