import { api_url } from '@/helpers/config';
import { ICreateFaqInterface } from '@/interfaces/fag.interface';
import { getAccessToken } from './auth';
import { api } from './_api';

export const panelGetFaqs = async (
  question: string,
  page: number,
  limit: number,
) => {
  return await api(
    `/panel/faq?search=${encodeURIComponent(question)}&page=${page}&limit=${limit}`,
    'GET',
    undefined,
    await getAccessToken(),
  );
};

export const panelGetFaqDetail = async (id: number) => {
  return await api(
    `/panel/faq/${id}`,
    'GET',
    undefined,
    await getAccessToken(),
  );
};

export const createFaq = async (newFaq: Record<string, unknown>) => {
  try {
    return await api(
      '/panel/faq',
      'POST',
      {
        body: newFaq,
        contentType: 'application/json',
      },
      await getAccessToken(),
    );
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Network error' };
  }
};

export const updateFaq = async (
  id: number,
  updatedFaq: Record<string, unknown>,
) => {
  try {
    return await api(
      `/panel/faq/${id}`,
      'PUT',
      {
        body: updatedFaq,
        contentType: 'application/json',
      },
      await getAccessToken(),
    );
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Network error' };
  }
};

export const deleteFaq = async (id: number) => {
  try {
    return await api(
      `/panel/faq/${id}`,
      'DELETE',
      undefined,
      await getAccessToken(),
    );
  } catch (error) {
    console.error('Delete failed:', error);
    return { error: error instanceof Error ? error.message : 'Network error' };
  }
};
