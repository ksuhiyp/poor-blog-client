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
}

export interface GetArticlesQuery {
  take?: number;
  skip?: number;
  order?: OrderByCondition;
  where?: any;
}
export type OrderByCondition = {
  [columnName: string]:
    | ('ASC' | 'DESC')
    | {
        order: 'ASC' | 'DESC';
        nulls?: 'NULLS FIRST' | 'NULLS LAST';
      };
};
