import * as Joi from 'joi';

export const createCatSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  breed: Joi.string().required(),
});
export interface Cat {
  name: string;
  age: number;
  breed: string;
}
