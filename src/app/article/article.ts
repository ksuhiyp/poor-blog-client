import { ArticleService } from './article.service';

export interface GetArticleQuery {
  readonly slug?: string;
  readonly id?: number;
}

export interface Article {
  id: number;
  slug: string;
  title: string;
  tagList: string;
  // TODO: type for author
  author: any;
  body: string;
  description: string;
  createdAt: Date;
  updateAt: Date;
  photo?: FormDataEntryValue;
}

export type CreateArticleDTO = Pick<Article, 'title'>;
