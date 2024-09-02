import Joi from 'joi';


export const createTicketDto = Joi.object({
  code: Joi.string().required(),
  purchase_datetime: Joi.date().required(),
  amount: Joi.number().required(),
  purchaser: Joi.string().required(), 
});
