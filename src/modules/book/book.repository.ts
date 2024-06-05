import { PaginatedOutputDto } from '@common/dtos/paginated-output.dto';
import { Injectable } from '@nestjs/common';
import { BookOutputDto } from './dtos/book-ouput.dto';
import { createPaginator } from 'prisma-pagination';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@providers/prisma/prisma.service';
import { BookListInputDto } from './dtos/book-list-input.dto';

@Injectable()
export class BookRepository {
  constructor(private prisma: PrismaService) {}
  async getAll(
    filter: BookListInputDto,
  ): Promise<PaginatedOutputDto<BookOutputDto>> {
    const paginate = createPaginator({ perPage: filter?.perPage || 10 });

    return paginate<BookOutputDto, Prisma.BooksFindManyArgs>(
      this.prisma.books,
      {
        where: {
          deleted_at: null,
          stock: {
            gt: 0,
          },
        },
      },
      {
        page: filter?.page || 1,
      },
    );
  }
}
