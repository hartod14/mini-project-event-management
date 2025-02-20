import { api_url } from '@/helpers/config';
import { ICreateBannerInterface } from '@/interfaces/banner.interface';
import { getAccessToken } from './auth';
import { api } from './_api';

export const panelGetDashboard = async () => {
  return await api(
    `/panel/dashboard`,
    'GET',
    undefined,
    await getAccessToken(),
  );
};
