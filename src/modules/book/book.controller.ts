import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { BookService } from '@modules/book/book.service';

import { ApiPaginatedResponse } from '@common/decorators/api-paginated-response.decorator';
import { BookOutputDto } from '@modules/book/dtos/book-ouput.dto';
import { PaginatedOutputDto } from '@common/dtos/paginated-output.dto';
import { BookListInputDto } from './dtos/book-list-input.dto';

@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'perPage', required: false, type: Number, description: 'Number of items per page' })
  @ApiPaginatedResponse(BookOutputDto)
  async getList(
    @Query() bookListInputDto: BookListInputDto,
  ): Promise<PaginatedOutputDto<BookOutputDto>> {
    return await this.bookService.getList({ bookListInputDto });
  }
}
