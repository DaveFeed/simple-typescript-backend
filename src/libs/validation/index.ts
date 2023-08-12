import { schema as ValidationSchema, validate } from 'express-validation';

import { Middleware } from 'src/domain/dto/types';

const config = {
    context: true,
    statusCode: 422,
    keyByField: true
};

/**
 * Creates a middleware with the provided schema
 *
 * @param schema An express-validation schema
 * @returns Middleware
 */
export function validationCheck(schema: ValidationSchema): Middleware {
    return validate(schema, config, {});
}
