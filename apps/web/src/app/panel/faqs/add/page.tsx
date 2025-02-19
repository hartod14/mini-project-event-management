'use client'
import { InputField } from '@/components/common/inputs/InputField';
import { InputFieldTextarea } from '@/components/common/inputs/InputFieldTextarea';
import { SwitchField } from '@/components/common/inputs/SwitchField';
import PanelFaqsAddViewModel from '@/components/Panel/pages/faqs/add/PanelFaqsAddViewModel';
import { storeFaqInit } from '@/helpers/formiks/faqs.formik';

import { createFaq } from '@/helpers/handlers/apis/faq.api';
import { storeEventValidator } from '@/validators/event.validator';
import { storeFaqValidator } from '@/validators/faq.validator';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import React from 'react';
import Swal from 'sweetalert2';

export default function PanelAddFaq() {
  const { isLoading, loading, router, setIsLoading } = PanelFaqsAddViewModel();
  return (
    <div className="">
      <Formik
        initialValues={storeFaqInit}
        validationSchema={storeFaqValidator}
        // onSubmit={(values) => alert(JSON.stringify(values, null, 3))}
        onSubmit={async (values) => {
          Swal.fire({
            title: 'Submit this new faq?',
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
                const res = await createFaq(values);

                if (res?.error) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong, please try again later!',
                  });
                } else {
                  Swal.fire({
                    title: 'Saved!',
                    text: 'Your new faq has been created.',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                  }).then(() => {
                    router.push('/panel/faqs');
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
                type="text"
                id="question"
                name="question"
                label="Question"
                placeholder=""
                required
              />

              <InputFieldTextarea id="answer" name="answer" label="Answer" required />
              <SwitchField
                id="is_active"
                label="Status"
                name="is_active"
                formik={formik}
              />
            </div>

            <hr className="my-10 text-gray-50" />

            {/* <p className="mb-4 text-red-400">{errMessage}</p> */}

            {/* <button type="submit">
            submit
          </button> */}
            <hr className="my-10 text-gray-50" />
            <div className="flex justify-end">
              <div className="flex gap-2">
                <Link
                  href={'/panel/faqs'}
                  onClick={() => router.push('/panel/faqs')}
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
    </div>
  );
}
