import { validate } from 'express-validation';

import { validationSchemas, config } from 'src/libs/validation/schemas';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function validationCheck(name: string) {
    return validate(validationSchemas[name as keyof typeof validationSchemas], config, {});
}
