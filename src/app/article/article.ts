export interface GetArticleQuery {
  readonly slug?: string;
  readonly id?: number;
}

export interface Article {
  slug: string;
  title: string;
  tagList: string;
  // TODO: type for author
  author: any;
  body: string;
  description: string;
  createdAt: Date;
  updateAt: Date;
}


