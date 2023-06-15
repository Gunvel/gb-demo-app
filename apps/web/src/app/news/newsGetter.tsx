import memoize from "lodash.memoize";
import { PeaceOfNews } from "./news";

const sortNews = (news: PeaceOfNews[]) => {
  return news.sort((a, b) => a.createdAt - b.createdAt)
}

const getNews = (): Promise<PeaceOfNews[]> =>
    new Promise((resolve) => {
      fetch("http://localhost:3333/api/news")
        .then(response => response.json())
        .then(data => {
          const sortedNews = sortNews(data);
          resolve(sortedNews)
        });
  });

export default memoize(getNews);
