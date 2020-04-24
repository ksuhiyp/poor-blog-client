export type Query{
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