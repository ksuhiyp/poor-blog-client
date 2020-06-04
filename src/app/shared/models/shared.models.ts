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

export interface Image {
  bucket?: string;
  location?: string;
  key: string;
  mimetype: string;
}

export interface DeleteArticleImagesDTO {
  location: string;
}

export interface UserData {
  username: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  bio: string;
  image: string;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  describtion: string;
  body: string;
  poster: any;
  images: any[];
  tags: any[];
}

export interface ConfirmationDialogConfig {
  confirm: string;
  dismiss: string;
  title: string;
  question: string;
  action: string;
}
