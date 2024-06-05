import { Injectable } from '@nestjs/common';
import { BookRepository } from '@modules/book/book.repository';
import { PaginatedOutputDto } from '@common/dtos/paginated-output.dto';
import { BookOutputDto } from './dtos/book-ouput.dto';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async getList({
    bookListInputDto,
  }): Promise<PaginatedOutputDto<BookOutputDto>> {
    return await this.bookRepository.getAll(bookListInputDto);
  }
}
