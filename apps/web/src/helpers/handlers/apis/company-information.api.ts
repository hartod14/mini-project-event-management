import { api } from './_api';
import { getAccessToken } from './auth';

export const panelGetCompanyInformationDetail = async () => {
  return await api(
    `/panel/company-information/1`,
    'GET',
    undefined,
    await getAccessToken(),
  );
};

export const updateCompanyInformation = async (
  updatedCompanyInformation: Record<string, unknown>,
) => {
  try {
    return await api(
      `/panel/company-information/1`,
      'PUT',
      {
        body: updatedCompanyInformation,
        contentType: 'application/json',
      },
      await getAccessToken(),
    );
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Network error' };
  }
};
