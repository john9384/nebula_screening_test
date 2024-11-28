import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../helpers/errors';
import { FailureResponse } from '../helpers/response';

const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof BaseError) {
    // Custom application error
    const failureResponse = new FailureResponse(err.message, {});
    return failureResponse.send(res, err.statusCode);
  }

  // Internal server error fallback
  console.error('Unexpected error:', err);
  const failureResponse = new FailureResponse('Something went wrong', {});
  return failureResponse.send(res, 500);
};

export default globalErrorHandler;
