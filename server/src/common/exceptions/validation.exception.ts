import { HttpStatus } from '@nestjs/common';

export class ValidationException extends Error {
  constructor(
    public message: string,
    public errors: string[],
    public statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super(message);
  }

  getStatus() {
    return this.statusCode;
  }
}
