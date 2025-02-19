'use client'
import PanelBannerAddViewModel from '@/components/Panel/pages/banners/add/PanelBannerAddViewModel';
import { storeBannerInit } from '@/helpers/formiks/banner.formik';
import {
  panelGetBannerDetail,
  updateBanner,
} from '@/helpers/handlers/apis/banner.api';
import { storeBannerValidator } from '@/validators/banner.validator';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { Form, Formik } from 'formik';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import DefaultImage from '@/../public/default_image.jpg';
import {
  IBannerInterface,
  ICreateBannerInterface,
} from '@/interfaces/banner.interface';
import { InputField } from '@/components/common/inputs/InputField';
import { SwitchField } from '@/components/common/inputs/SwitchField';
import Link from 'next/link';
type Props = {
  params: Promise<{ id: number }>;
};
export default function PanelEditBanner({ params }: Props) {
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
  const [initialValues, setInitialValues] = useState<ICreateBannerInterface>();
  useEffect(() => {
    async function fetchBanner() {
      try {
        const { id } = await params;
        const banner: IBannerInterface = (await panelGetBannerDetail(id)).data;

        // console.log(banner);

        if (banner) {
          setInitialValues((prev) => {
            return {
              image: banner.image,
              is_active: banner.is_active,
              name: banner.name,
            };
          });
          setImage(banner.image)
        }
      } catch (error) {
        console.error('Error fetching Faq:', error);
      }
    }

    fetchBanner();
  }, [params]);
  return (
    <div>
      {initialValues && (
        <Formik
          initialValues={initialValues}
          validationSchema={storeBannerValidator}
          // onSubmit={(values) => alert(JSON.stringify(values, null, 3))}
          onSubmit={async (values) => {
            Swal.fire({
              title: 'Submit this update banner?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#ABABAB',
              confirmButtonText: 'Yes, save it!',
              cancelButtonText: 'Back',
            }).then(async (result) => {
              if (result.isConfirmed) {
                const { id } = await params;
                try {
                  loading?.setLoading(true);
                  const res = await updateBanner(id,values);

                  if (res?.error) {
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Something went wrong, please try again later!',
                    });
                  } else {
                    Swal.fire({
                      title: 'Saved!',
                      text: 'Your new banner has been updated.',
                      icon: 'success',
                      confirmButtonColor: '#3085d6',
                    }).then(() => {
                      router.push('/panel/banners');
                    });
                  }
                } catch (error) {
                  alert('something error');
                } finally {
                  loading?.setLoading(false);
                }
              }
            });
          }}
        >
          {(formik) => (
            <Form>
              <div className="grid gap-6 mb-6 grid-cols-1">
                <div>
                  <div className=" my-10">
                    <div className="flex items-center gap-2 mb-3">
                      <label className="text-sm font-medium text-gray-900 dark:text-white">
                        Image
                      </label>
                      <button
                        type="button"
                        onClick={() => refImage.current?.click()}
                        className={`${isLoading ? 'bg-blue-200' : 'bg-blue-700'}  px-3 py-2 text-sm font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                        disabled={isLoading}
                      >
                        <div className="flex gap-2 items-center">
                          <ArrowUpTrayIcon width={20} height={20} />
                          {isLoading ? 'Uploading...' : 'Upload image'}
                        </div>
                      </button>
                    </div>
                    <Image
                      width={400}
                      height={400}
                      onClick={() => refImage.current?.click()}
                      className="rounded h-[250] w-[250] aspect-square object-cover"
                      src={isLoading ? '/spinner.gif' : image || DefaultImage}
                      alt="image"
                    />
                    <input
                      type="file"
                      hidden
                      ref={refImage}
                      accept="image/png, image/gif, image/jpeg"
                      onChange={(e) => upload(e, formik.setFieldValue)}
                    />
                  </div>
                </div>
                <InputField
                  type="text"
                  id="name"
                  name="name"
                  label="Name"
                  placeholder=""
                  required
                />

                <SwitchField
                  id="is_active"
                  label="Status"
                  name="is_active"
                  formik={formik}
                />
              </div>

              <hr className="my-10 text-gray-50" />

              <div className="flex justify-end">
                <div className="flex gap-2">
                  <Link
                    href={'/panel/banners'}
                    onClick={() => router.push('/panel/banners')}
                    className={
                      'bg-gray-50 border border-gray-300 text-gray-400font-semibold px-5 py-3 rounded mb-6'
                    }
                  >
                    Back
                  </Link>
                  <button
                    type="submit"
                    className={`${
                      !(formik.isValid && formik.dirty) || formik.isSubmitting
                        ? 'bg-gray-300 text-gray-400'
                        : 'bg-blue-900 text-white'
                    }   font-semibold px-5 py-3 rounded mb-6`}
                    disabled={
                      !(formik.isValid && formik.dirty) || formik.isSubmitting
                    }
                  >
                    {formik.isSubmitting ? 'Processing...' : 'Submit'}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
