import { api_url } from '@/helpers/config';
import { ICreateBannerInterface } from '@/interfaces/banner.interface';
import { getAccessToken } from './auth';
import { api } from './_api';

export const panelGetVouchers = async (
  name: string,
  page: number,
  limit: number,
) => {
  return await api(
    `/panel/vouchers?search=${encodeURIComponent(name)}&page=${page}&limit=${limit}`,
    'GET',
    undefined,
    await getAccessToken(),
  );
};

export const panelGetVoucherDetail = async (id: number) => {
  return await api(
    `/panel/vouchers/${id}`,
    'GET',
    undefined,
    await getAccessToken(),
  );
};

export const createVoucher = async (newVoucher: Record<string, unknown>) => {
  try {
    return await api(
      '/panel/vouchers',
      'POST',
      {
        body: newVoucher,
        contentType: 'application/json',
      },
      await getAccessToken(),
    );
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Network error' };
  }
};

export const updateVoucher= async (
  id: number,
  updatedVoucher: Record<string, unknown>,
) => {
  try {
    return await api(
      `/panel/vouchers/${id}`,
      'PUT',
      {
        body: updatedVoucher,
        contentType: 'application/json',
      },
      await getAccessToken(),
    );
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Network error' };
  }
};

export const deleteVoucher= async (id: number) => {
  try {
    return await api(
      `/panel/vouchers/${id}`,
      'DELETE',
      undefined,
      await getAccessToken(),
    );
  } catch (error) {
    console.error('Delete failed:', error);
    return { error: error instanceof Error ? error.message : 'Network error' };
  }
};
