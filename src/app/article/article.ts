import { ArticleService } from './article.service';
import { Tags, Image } from '../shared/models/shared.models';

export interface GetArticleQuery {
  readonly slug?: string;
  readonly id?: number;
}

export interface Article {
  id: number;
  slug: string;
  title: string;
  tags: Tags[];
  // TODO: type for author
  author: any;
  body: string;
  description: string;
  createdAt: Date;
  updateAt: Date;
  poster?: Image;
  images?: Image[];
}

export type CreateArticleDTO = Pick<Article, 'title'>;
