'use client'
import { InputField } from '@/components/common/inputs/InputField';
import InputSelectMultiple from '@/components/common/inputs/InputSelectMultiple';
import PanelVoucherAddViewModel from '@/components/panel/pages/vouchers/add/PanelVoucherAddViewModel';
import { panelGetVoucherDetail, updateVoucher } from '@/helpers/handlers/apis/voucher.api';
import { ICreateVoucherInterface, IVoucherDetailInterface } from '@/interfaces/voucher.interface';
import { storeVoucherValidator } from '@/validators/voucher.valiator';
import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
type Props = {
  params: Promise<{ id: number }>;
};
export default function PanelVoucherEdit({ params }: Props) {
  const { isLoading, loading, router, setIsLoading, eventOption } =
    PanelVoucherAddViewModel();
  const [initialValues, setInitialValues] = useState<ICreateVoucherInterface>();
  useEffect(() => {
    async function fetchFaq() {
      try {
        const { id } = await params;
        const voucher: IVoucherDetailInterface = (
          await panelGetVoucherDetail(id)
        ).data;

        // console.log(voucher);

        if (voucher) {
          setInitialValues({
            end_date: new Date(voucher.end_date).toISOString().split('T')[0],
            events: voucher.voucher_events.map((row) => {
              return row.event_id;
            }),
            name: voucher.name,
            price: voucher.price,
            start_date: new Date(voucher.start_date).toISOString().split('T')[0],
          });
        }
      } catch (error) {
        console.error('Error fetching Faq:', error);
      }
    }

    fetchFaq();
  }, [params]);
  return (
    <div>
      {initialValues && (
        <Formik
          initialValues={initialValues}
          validationSchema={storeVoucherValidator}
          onSubmit={async (values: any) => {
            Swal.fire({
              title: 'Submit this update Voucher?',
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
                  const { id } = await params;
                  const res = await updateVoucher(id, values);

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
