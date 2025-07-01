export const Errors = {
  USER: {
    EXISTS: 'A user with this email already exists',
    NOT_FOUND: 'User not found',
  },
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid credentials',
    UNAUTHORIZED: 'Unauthorized access',
    SESSION_ID_REQUIRED: 'Session ID is required',
  },
  SURVEY: {
    NOT_FOUND: 'Survey not found',
    INACTIVE: 'Survey is not active',
    EXPIRED: 'Survey has expired',
  },
  QUESTION: {
    NOT_FOUND: 'Question not found',
    UNSUPPORTED_TYPE: 'Unsupported question type',
  },
  RESPONSE: {
    NOT_FOUND: 'Response not found',
    ALREADY_SUBMITTED: 'Response already submitted for this survey',
  },
};
