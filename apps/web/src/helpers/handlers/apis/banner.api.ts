import { api_url } from '@/helpers/config';
import { ICreateBannerInterface } from '@/interfaces/banner.interface';
import { getAccessToken } from './auth';
import { api } from './_api';

export const panelGetBanners = async (
  name: string,
  page: number,
  limit: number,
) => {
  return await api(
    `/panel/banners?search=${encodeURIComponent(name)}&page=${page}&limit=${limit}`,
    'GET',
    undefined,
    await getAccessToken(),
  );
};

export const panelGetBannerDetail = async (id: number) => {
  return await api(
    `/panel/banners/${id}`,
    'GET',
    undefined,
    await getAccessToken(),
  );
};

export const createBanner = async (newBanner: Record<string, unknown>) => {
  try {
    return await api(
      '/panel/banners',
      'POST',
      {
        body: newBanner,
        contentType: 'application/json',
      },
      await getAccessToken(),
    );
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Network error' };
  }
};

export const updateBanner = async (
  id: number,
  updatedbanners: Record<string, unknown>,
) => {
  try {
    return await api(
      `/panel/banners/${id}`,
      'PUT',
      {
        body: updatedbanners,
        contentType: 'application/json',
      },
      await getAccessToken(),
    );
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Network error' };
  }
};

export const deleteBanner = async (id: number) => {
  try {
    return await api(
      `/panel/banners/${id}`,
      'DELETE',
      undefined,
      await getAccessToken(),
    );
  } catch (error) {
    console.error('Delete failed:', error);
    return { error: error instanceof Error ? error.message : 'Network error' };
  }
};
