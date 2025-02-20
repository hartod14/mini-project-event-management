'use client';
import { InputField } from '@/components/common/inputs/InputField';
import InputSelectMultiple from '@/components/common/inputs/InputSelectMultiple';
import PanelVoucherAddViewModel from '@/components/panel/pages/vouchers/add/PanelVoucherAddViewModel';
import { storeVoucherInit } from '@/helpers/formiks/voucher.formik';
import { createVoucher } from '@/helpers/handlers/apis/voucher.api';
import { storeVoucherValidator } from '@/validators/voucher.valiator';
import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import React from 'react';
import Swal from 'sweetalert2';

export default function PanelAddVoucher() {
  const { isLoading, loading, router, setIsLoading, eventOption } =
    PanelVoucherAddViewModel();
  return (
    <div>
      <Formik
        initialValues={storeVoucherInit}
        validationSchema={storeVoucherValidator}
        // onSubmit={(values) => alert(JSON.stringify(values, null, 3))}
        onSubmit={async (values) => {
          Swal.fire({
            title: 'Submit this new Voucher?',
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
                const res = await createVoucher(values);

                if (res?.error) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong, please try again later!',
                  });
                } else {
                  Swal.fire({
                    title: 'Saved!',
                    text: 'Your new voucher has been created.',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                  }).then(() => {
                    router.push('/panel/vouchers');
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
                id="name"
                name="name"
                label="Name"
                placeholder=""
                required
              />
              <InputField
                type="number"
                id="price"
                name="price"
                label="Name"
                placeholder=""
                required
              />
              <InputField
                type="date"
                id="start_date"
                name="start_date"
                label="Start Date"
                placeholder=""
                required
              />
              <InputField
                type="date"
                id="end_date"
                name="end_date"
                label="End Date"
                placeholder=""
                required
              />
               <Field
              className="custom-select"
              name="events"
              options={eventOption}
              component={InputSelectMultiple}
              placeholder="Events"
              isMulti={true}
            />
            </div>
           

            <hr className="my-10 text-gray-50" />

            {/* <p className="mb-4 text-red-400">{errMessage}</p> */}

            {/* <button type="submit">
            submit
          </button> */}
     
            <div className="flex justify-end">
              <div className="flex gap-2">
                <Link
                  href={'/panel/vouchers'}
                  onClick={() => router.push('/panel/vouchers')}
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
