import { Model } from 'dva';

export interface IModel<T = any> extends Model {
  state: T;
}

export interface IResult<T = any> {
  code: number;
  message: string;
  payload: T;
}
