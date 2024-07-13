export const USER_CREDENTIALS_MAX_LENGTH = 50;
export const USER_CREDENTIALS_MIN_LENGTH = 2;
export const EMAIL_MAX_LENGTH = 255;
export const EMAIL_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 50;
export const PASSWORD_MIN_LENGTH = 6;

export const ApiResponseMessages = {
  SUCCESS: { status: 200, description: 'Success' },
  BAD_REQUEST: { status: 400, description: 'Bad Request' },
  UNAUTHORIZED: { status: 401, description: 'Unauthorized' },
  NOT_FOUND: { status: 404, description: 'Not Found' },
  INTERNAL_SERVER_ERROR: { status: 500, description: 'Internal Server Error' },
};
