import { Module } from '@nestjs/common';
import { PrismaModule } from '@providers/prisma/prisma.module';
import { BookController } from '@modules/book/book.controller';
import { BookService } from '@modules/book/book.service';
import { BookRepository } from '@modules/book/book.repository';

@Module({
  imports: [PrismaModule],
  controllers: [BookController],
  providers: [BookService, BookRepository],
})
export class BookModule {}
