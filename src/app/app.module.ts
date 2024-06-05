import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from '@config/app.config';
import { PrismaModule } from '@providers/prisma/prisma.module';
import { BookModule } from '@modules/book/book.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    PrismaModule,
    BookModule
  ],
})
export class AppModule {}
