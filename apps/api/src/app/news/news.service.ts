import { Injectable } from "@nestjs/common";
import { CreateNewsDto } from "./news.controller";
import memoize from "lodash.memoize";

@Injectable()
export class NewsService {

  newsGetter;

  constructor() {
    this.newsGetter = memoize(this.generateArrayNews);//this.generateArrayNews//
  }

  private generateArrayNews() {
    return Object.keys([...Array(20)])
      .map(key => Number(key) + 1)
      .map(n => ({
        id: n,
        title: `Важная новость ${n}`,
        description: (rand => ([...Array(rand(1000))].map(() => rand(10 ** 16).toString(36).substring(rand(10))).join(' ')))(max => Math.ceil(Math.random() * max)),
        createdAt: Date.now()
      }))
  }

  async getNews() {
    return new Promise(resolve => {
      const news = this.newsGetter();

      setTimeout(() => {
        resolve(news);
      }, 100)
    });
  }

  async create(peaceOfNews: CreateNewsDto) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('Новость успешно создана', peaceOfNews);
        resolve({ id: Math.ceil(Math.random() * 1000), ...peaceOfNews });
      }, 100)
    });
  }
}
