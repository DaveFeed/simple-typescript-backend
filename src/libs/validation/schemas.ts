import { Joi } from 'express-validation';

export const config = {
    context: true,
    statusCode: 422,
    keyByField: true
};

export const validationSchemas = {
    idFromParams: {
        params: Joi.object({
            id: Joi.number().required()
        })
    }
};
