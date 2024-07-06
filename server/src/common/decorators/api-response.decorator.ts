import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ApiResponseMessages } from 'src/shared/constants';

export function ApiStandardResponses() {
  return applyDecorators(
    ApiResponse(ApiResponseMessages.SUCCESS),
    ApiResponse(ApiResponseMessages.BAD_REQUEST),
    ApiResponse(ApiResponseMessages.UNAUTHORIZED),
    ApiResponse(ApiResponseMessages.NOT_FOUND),
    ApiResponse(ApiResponseMessages.INTERNAL_SERVER_ERROR),
  );
}