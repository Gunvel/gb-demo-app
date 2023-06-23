import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as redisStore from 'cache-manager-redis-store';
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: '192.168.1.84',
      port: 6001,
    }),
    MongooseModule.forRoot('mongodb://blogadm:nimda1@192.168.1.84:27017/newsblog'),
    NewsModule,
    AuthorsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
