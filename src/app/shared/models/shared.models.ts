export type Query = {
  take?: number;
  skip?: number;
  order?: OrderByCondition;
  where?: any;
};
export type OrderByCondition = {
  [columnName: string]:
    | ('ASC' | 'DESC')
    | {
        order: 'ASC' | 'DESC';
        nulls?: 'NULLS FIRST' | 'NULLS LAST';
      };
};

export type Tags = {
  title: string;
  id?: number;
};

export interface Poster {
  bucket?: string;
  location?: string;
  key: string;
  mimetype: string;
}
