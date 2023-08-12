import { Joi } from 'express-validation';

import { Schema } from 'src/domain/dto/types';

export class Schemas {
    public static idFromParams: Schema = {
        params: Joi.object({
            id: Joi.number().required()
        })
    };
}
