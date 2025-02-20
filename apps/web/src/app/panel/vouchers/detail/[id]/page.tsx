'use client';
import { DisableInput } from '@/components/common/inputs/DisableInputField';
import InputSelectMultiple from '@/components/common/inputs/InputSelectMultiple';
import PanelVoucherAddViewModel from '@/components/panel/pages/vouchers/add/PanelVoucherAddViewModel';
import { formatCurrency } from '@/helpers/format.currency';
import { formatDate } from '@/helpers/format.time';
import { panelGetVoucherDetail } from '@/helpers/handlers/apis/voucher.api';
import { ICreateVoucherInterface, IVoucherDetailInterface } from '@/interfaces/voucher.interface';
import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
type Props = {
  params: Promise<{ id: number }>;
};
export default function PanelVoucherDetail({ params }: Props) {
  const { eventOption, isLoading, loading, router, setIsLoading } =
    PanelVoucherAddViewModel();
  const [vouchers, setVouchers] = useState<ICreateVoucherInterface>();
  useEffect(() => {
    async function fetchFaq() {
      try {
        const { id } = await params;
        const voucher: IVoucherDetailInterface = (
          await panelGetVoucherDetail(id)
        ).data;

        // console.log(voucher);

        if (voucher) {
          setVouchers({
            end_date: new Date(voucher.end_date).toISOString().split('T')[0],
            events: voucher.voucher_events.map((row) => {
              return row.event_id;
            }),
            name: voucher.name,
            price: voucher.price,
            start_date: new Date(voucher.start_date)
              .toISOString()
              .split('T')[0],
          });
        }
      } catch (error) {
        console.error('Error fetching Faq:', error);
      }
    }

    fetchFaq();
  }, [params]);
  if (!vouchers) return <div>Voucher tidak ditemukan</div>;
  return (
    <div>
      {vouchers && (
        <Formik
          initialValues={vouchers}
          // onSubmit={(values) => alert(JSON.stringify(values, null, 3))}
          onSubmit={async (values) => {}}
        >
          {(formik) => (
            <Form>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <DisableInput label="Name" value={vouchers?.name} />
                <DisableInput
                  label="Price"
                  value={formatCurrency(vouchers.price)}
                />
                <DisableInput
                  label="Start Date"
                  value={formatDate(vouchers.start_date)}
                />
                <DisableInput
                  label="End Date"
                  value={formatDate(vouchers.end_date)}
                />

                <Field
                  className="custom-select"
                  name="events"
                  value={vouchers.events}
                  options={eventOption}
                  component={InputSelectMultiple}
                  placeholder="Events"
                  isMulti={true}
                  isDisabled={true}
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
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
