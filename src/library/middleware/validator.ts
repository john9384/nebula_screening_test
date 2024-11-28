import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../utils/errors";

export const validateDTO = (DTOClass: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dtoInstance = plainToInstance(DTOClass, req.body);

        const errors = await validate(dtoInstance);
        if (errors.length > 0) {
            const errorMessages = errors.map((err) =>
                Object.values(err.constraints || {}).join(", ")
            );
            return next(new BadRequestError(errorMessages.join("; ")));
        }

        next();
    };
};
