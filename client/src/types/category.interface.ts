export interface ICategory {
  id: string;
  name: string;
  slug: string;
}

export type UpdateCategory = Pick<ICategory, 'name'>;
