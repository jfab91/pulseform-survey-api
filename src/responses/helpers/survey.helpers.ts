import { Survey } from '../../surveys/schemas/survey.schema';

export function isSurveyExpired(survey: Survey): boolean {
  return survey.expiresAt ? survey.expiresAt.getTime() < Date.now() : false;
}
