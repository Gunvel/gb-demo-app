import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AuthorsService } from './authors.service';


@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorService: AuthorsService) {}

  @Get()
  async getTop10() {
    return await this.authorService.getTop10();
  }

  @Post('/:name/:count')
  async setAuthor(@Param('name') name: string, @Param('count') count: number) {
    return await this.authorService.setAuthor(name, count);
  }
}
