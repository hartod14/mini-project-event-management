'use client';
import { DisableInput } from '@/components/common/inputs/DisableInputField';
import PanelBannerAddViewModel from '@/components/Panel/pages/banners/add/PanelBannerAddViewModel';
import { panelGetBannerDetail } from '@/helpers/handlers/apis/banner.api';
import {
  IBannerInterface,
  ICreateBannerInterface,
} from '@/interfaces/banner.interface';
import { Formik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
type Props = {
  params: Promise<{ id: number }>;
};
export default function PanelDetailBanner({ params }: Props) {
  const {
    isLoading,
    loading,
    router,
    setIsLoading,
    image,
    refImage,
    setImage,
    upload,
  } = PanelBannerAddViewModel();

  const [banner, setBanner] = useState<any>(null);
  useEffect(() => {
    async function fetchBanner() {
      try {
        const { id } = await params;
        const banner: IBannerInterface = (await panelGetBannerDetail(id)).data;

        setBanner(banner);
      } catch (error) {
        console.error('Error fetching Faq:', error);
      }
    }

    fetchBanner();
  }, [params]);

  if (!banner) return <p>Event not found</p>;


  return (
    <div>
      <div className="grid gap-6 mb-6 grid-cols-1">
        <div>
          <label className="text-sm font-medium text-gray-900 dark:text-white">
            Image
          </label>
          <Image
            width={400}
            height={400}
            src={banner.image}
            className="rounded object-cover mt-3"
            alt="Event Image"

          />
        </div>
        <DisableInput label="Name" value={banner?.name} />

        <DisableInput label="Status" value={banner.is_active} />
      </div>
      <hr className="my-10 text-gray-50" />

      <div className="flex justify-end">
        <Link
          href={'/panel/banners'}
          className="bg-gray-50 border border-gray-300 text-gray-700  px-5 py-3 rounded mb-6"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
