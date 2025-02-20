'use client';
import PanelBannerAddViewModel from '@/components/Panel/pages/banners/add/PanelBannerAddViewModel';
import { LoadingContext } from '@/context/LoadingContext';
import { profileInit, updateProfileInit } from '@/helpers/formiks/formik.init';
import { updateUser, updateUserNew } from '@/helpers/handlers/apis/auth';
import { updateProfileValidator } from '@/validators/auth.validator';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import DefaultImage from '@/../public/default_image.jpg';
import { InputField } from '@/components/common/inputs/InputField';
import PanelProfileViewModel from '@/components/panel/pages/profile/PanelProfileViewModel';

export default function PanelProfile() {
  const { data: session, update } = useSession();
  const [copied, setCopied] = useState(false);
  const [initialValues, setInitialValues] = useState<any>();
  const {
    image,
    isLoading,
    loading,
    refImage,
    router,
    setImage,
    setIsLoading,
    upload,
  } = PanelProfileViewModel();

  const handleCopy = () => {
    if (session?.user?.referral_code) {
      navigator.clipboard.writeText(session.user.referral_code);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000); // Reset after 2 seconds
    }
  };

  useEffect(() => {
    if (session) {
      setInitialValues({
        email: session.user.email ?? '',
        phone: session.user.phone ?? '',
        name: session.user.name ?? '',
        profile_photo: session.user.profile_photo ?? '',
      });
      setImage(session.user.profile_photo ?? '');
    }
  }, [session]);
  return (
    <div>
      {initialValues && (
        <Formik
          initialValues={initialValues}
          validationSchema={updateProfileValidator}
          // onSubmit={(values) => alert(JSON.stringify(values, null, 3))}
          onSubmit={async (values) => {
            Swal.fire({
              title: 'Submit this update Profile?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#ABABAB',
              confirmButtonText: 'Yes, save it!',
              cancelButtonText: 'Back',
            }).then(async (result) => {
              if (result.isConfirmed) {
                try {
                  loading?.setLoading(true);
                  const res: any = await updateUserNew(values).then(() => {
                    update()
                  });

                  if (res?.error) {
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Something went wrong, please try again later!',
                    });
                  } else {
                    Swal.fire({
                      title: 'Saved!',
                      text: 'Your new profile has been updated.',
                      icon: 'success',
                      confirmButtonColor: '#3085d6',
                    }).then(() => {
                      // router.push('/panel/banners');
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
                  <div className=" mb-2">
                    <div className="flex items-center gap-2 mb-3">
                      <label className="text-sm font-medium text-gray-900 dark:text-white">
                        Image
                      </label>
                      {/* <button
                        type="button"
                        onClick={() => refImage.current?.click()}
                        className={`${isLoading ? 'bg-blue-200' : 'bg-blue-700'}  px-3 py-2 text-sm font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                        disabled={isLoading}
                      >
                        <div className="flex gap-2 items-center">
                          <ArrowUpTrayIcon width={20} height={20} />
                          {isLoading ? 'Uploading...' : 'Upload image'}
                        </div>
                      </button> */}
                    </div>
                    <Image
                      width={100}
                      height={100}
                      onClick={() => refImage.current?.click()}
                      className="rounded-full h-[250] w-[250] aspect-square object-cover"
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
                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Referal Code
                  </label>
                  <div className='flex gap-2 items-center'>
                    <input
                      disabled
                      type="text"
                      value={String(session?.user.referral_code)}
                      className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <p
                      className="cursor-pointer text-blue-500"
                      onClick={handleCopy}
                    >
                      <u>{copied ? 'Copied!' : 'Copy'}</u>
                    </p>
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
                <InputField
                  type="text"
                  id="email"
                  name="email"
                  label="Email"
                  placeholder=""
                  required
                />
                <InputField
                  type="text"
                  id="phone"
                  name="phone"
                  label="Phone"
                  placeholder=""
                  required
                />
              </div>

              <hr className="my-10 text-gray-50" />

              <div className="flex justify-end">
                <div className="flex gap-2">
                  <div
                    onClick={() => router.back()}
                    className={
                      'bg-gray-50 border cursor-pointer border-gray-300 text-gray-400font-semibold px-5 py-3 rounded mb-6'
                    }
                  >
                    Back
                  </div>
                  <button
                    type="submit"
                    className={`${!(formik.isValid && formik.dirty) || formik.isSubmitting
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
