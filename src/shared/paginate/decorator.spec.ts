import { ExecutionContext } from '@nestjs/common';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import {
  CustomParamFactory,
  HttpArgumentsHost,
} from '@nestjs/common/interfaces';
import { Request as ExpressRequest } from 'express';
import { PaginateQuery, Paginate } from './decorator';

// eslint-disable-next-line @typescript-eslint/ban-types
function getParamDecoratorFactory<T>(decorator: Function): CustomParamFactory {
  class Test {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public test(@decorator() _value: T): void {
      //
    }
  }
  const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, 'test');
  return args[Object.keys(args)[0]].factory;
}
const decoratorFactory = getParamDecoratorFactory<PaginateQuery>(Paginate);

function expressContextFactory(
  query: ExpressRequest['query'],
): Partial<ExecutionContext> {
  const mockContext: Partial<ExecutionContext> = {
    switchToHttp: (): HttpArgumentsHost =>
      Object({
        getRequest: (): Partial<ExpressRequest> =>
          Object({
            protocol: 'http',
            get: () => 'localhost',
            originalUrl: '/items?size=10',
            query: query,
          }),
      }),
  };
  return mockContext;
}

describe('Decorator', () => {
  it('should handle express default values query fields', () => {
    const context = expressContextFactory({});

    const result: PaginateQuery = decoratorFactory(null, context);

    expect(result).toStrictEqual({
      page: 1,
      size: 10,
    });
  });

  it('should handle express defined query fields', () => {
    const context = expressContextFactory({
      page: '1',
      size: '10',
    });

    const result: PaginateQuery = decoratorFactory(null, context);

    expect(result).toStrictEqual({
      page: 1,
      size: 10,
    });
  });
});
