'use client';
import { InputField } from '@/components/common/inputs/InputField';
import { InputFieldTextarea } from '@/components/common/inputs/InputFieldTextarea';
import PanelBannerAddViewModel from '@/components/Panel/pages/banners/add/PanelBannerAddViewModel';
import {
  panelGetCompanyInformationDetail,
  updateCompanyInformation,
} from '@/helpers/handlers/apis/company-information.api';
import {
  ICompanyInformationInterface,
  ICompanyInformationUpdateInterface,
} from '@/interfaces/company-information.interface';
import { companyInformationValidator } from '@/validators/company-information.validator';
import { FieldArray, Form, Formik } from 'formik';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function PanelContactInformation() {
  const { isLoading, loading, router, setIsLoading } =
    PanelBannerAddViewModel();
  const [initialValues, setInitialValues] =
    useState<ICompanyInformationUpdateInterface>();

  useEffect(() => {
    async function fetchFaq() {
      try {
        const companyInformation: ICompanyInformationInterface = (
          await panelGetCompanyInformationDetail()
        ).data;

        // console.log(Faq);
        const tempSocialMedia: any = companyInformation.social_media;
        if (companyInformation) {
          setInitialValues({
            about_us: companyInformation.about_us,
            address: companyInformation.address,
            email: companyInformation.email,
            phone: companyInformation.phone,
            social_media: JSON.parse(tempSocialMedia),
          });
        }
      } catch (error) {
        console.error('Error fetching Faq:', error);
      }
    }

    fetchFaq();
  }, []);
  return (
    <div className="">
      {initialValues && (
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={companyInformationValidator}
          // onSubmit={(values) => alert(JSON.stringify(values, null, 3))}
          onSubmit={async (values) => {
            Swal.fire({
              title: 'Submit this Company Information',
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
                  let temp = {
                    ...values,
                    social_media: JSON.stringify(values.social_media),
                  };
                  const res = await updateCompanyInformation(temp);

                  if (res?.error) {
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Something went wrong, please try again later!',
                    });
                  } else {
                    Swal.fire({
                      title: 'Saved!',
                      text: 'contact information has been updated.',
                      icon: 'success',
                      confirmButtonColor: '#3085d6',
                    }).then(() => {
                      router.refresh();
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
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <InputField
                  id="email"
                  type="email"
                  name="email"
                  label="Email"
                  placeholder=""
                  required
                />
                <InputField
                  id="phone"
                  type="phone"
                  name="phone"
                  label="Phone Number"
                  placeholder=""
                  required
                />

                <InputFieldTextarea
                  id="address"
                  name="address"
                  label="Address"
                  required
                />
                <InputFieldTextarea
                  id="about_us"
                  name="about_us"
                  label="About Us"
                  required
                />
              </div>

              <hr className="my-10 text-gray-50" />

              <FieldArray
                name="social_media"
                render={(arrayHelpers) => (
                  <div>
                    <div className="flex gap-2 items-center">
                      <label
                        htmlFor={'social_media'}
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Social Media
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({
                            name: '',
                            link: '',
                          })
                        }
                        className="bg-blue-600 text-white px-2 py-1 rounded-md text-sm hover:bg-blue-700"
                      >
                        + Add Ticket
                      </button>
                    </div>
                    {formik.values?.social_media?.map(
                      (ticket: any, index: number) => (
                        <div
                          key={index}
                          className="flex gap-2 items-center mt-3"
                        >
                          <div className="md:flex gap-4  w-full">
                            <InputField
                              type="text"
                              id={`social_media[${index}].name`}
                              name={`social_media[${index}].name`}
                              label=""
                              placeholder="name"
                              required
                            />
                            <InputField
                              type="text"
                              id={`social_media[${index}].link`}
                              name={`social_media[${index}].link`}
                              label=""
                              placeholder="Link"
                              required
                            />
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                )}
              />

              {/* <p className="mb-4 text-red-400">{errMessage}</p> */}

              {/* <button type="submit">
          submit
        </button> */}
              <hr className="my-10 text-gray-50" />
              <div className="flex justify-end">
                <div className="flex gap-2">
                  <Link
                    href={'/panel/company-information'}
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
