"use client"

import React, { useEffect, useState } from "react";
import { InputFieldTextarea } from "@/components/common/inputs/InputFieldTextarea";
import { InputSelect } from "@/components/common/inputs/InputSelect";
import Image from "next/image";
import DefaultImage from "@/../public/default_image.jpg"
import { ArrowUpTrayIcon, SignalIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { SwitchField } from "@/components/common/inputs/SwitchField";
import { FieldArray, Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import { storeEventValidator } from "@/validators/event.validator";
import { storeEventInit } from "@/helpers/formiks/event.formik";
import Swal from "sweetalert2";
import { panelGetTransactionDetail, updateTransactionConfirmation } from "@/helpers/handlers/apis/transaction.api";
import { InputField } from "@/components/common/inputs/InputField";
import Link from "next/link";
import { Transaction } from "@tiptap/pm/state";
import { ITransactionInterface } from "@/interfaces/transaction.interface";
import StatusBadge from "@/components/common/badges/StatusBadge";
import { formatDate, formatTimeOnly } from "@/helpers/format.time";
import { formatCurrency } from "@/helpers/format.currency";

import * as Yup from 'yup';
import { useRouter } from "next/navigation";

type Props = {
  params: Promise<{ id: number }>;
};

export default function PanelEditEvent({ params }: Props) {
  // const { cities, categories, upload, refImage, loading, isLoading, image, router } = TransactionEditViewModel();
  const router = useRouter()
  const [transaction, setTransaction] = useState<ITransactionInterface>()

  const formik = useFormik({
    initialValues: {
      status: '',
    },
    validationSchema: Yup.object({
      status: Yup.string()
        .oneOf(['approved', 'rejected'], 'Invalid selection')
        .required('Status is required'),
    }),
    onSubmit: (values) => {
      Swal.fire({
        title: "Confirmation this action?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#ABABAB",
        confirmButtonText: "Yes, save it!",
        cancelButtonText: "Back"
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            if (!transaction || transaction.id === undefined) {
              Swal.fire("Error", "Transaction data is not available.", "error");
              return;
            }
            const res = await updateTransactionConfirmation(transaction?.id, transaction, values.status);

            if (res?.error) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong, please try again later!",
              });
            } else {
              Swal.fire({
                title: "Saved!",
                text: "Transaction Has been updated.",
                icon: "success",
                confirmButtonColor: "#3085d6",
              }).then(() => {
                router.push("/panel/transactions");
              });
            }
          } catch (error) {
            alert('something error')
          } finally {
            // loading?.setLoading(false);
          }
        }
      });
    },

  });

  useEffect(() => {
    async function fetchTransaction() {
      try {
        const { id } = await params;
        const data = (await panelGetTransactionDetail(id)).data;

        const groupedTickets = data.transaction_tickets.reduce((acc: any, ticket: any) => {
          const { id, name, price } = ticket.ticket_type;

          if (!acc[id]) {
            acc[id] = { id, name, price, count: 0 };
          }

          acc[id].count += 1;
          return acc;
        }, {} as Record<number, { id: number; name: string; price: string; count: number }>);

        const total_price_tickets = data.transaction_tickets.reduce(
          (sum: number, ticket: any) => sum + Number(ticket.ticket_type.price),
          0
        );

        setTransaction({
          ...data,
          grouped_tickets: Object.values(groupedTickets),
          total_price_tickets: total_price_tickets,
        });

      } catch (error) {
        console.error("Error fetching transaction:", error);
      }
    }

    fetchTransaction();
  }, [params]);


  return (
    transaction ? (
      <div>
        <p></p>
        <StatusBadge status={String(transaction.payment_status.toLowerCase())} />
        <h1 className="font-bold text-2xl pt-4 pb-3">Detail Pemesanan</h1>
        <section>
          <div className="flex gap-12">
            <div className="w-[240px] h-[140px] rounded-xl">
              <Image
                src={'/ticket1.jpg'}
                width={420}
                height={200}
                alt="ticket"
                className="object-cover w-full h-full rounded-xl"
              />
            </div>
            <div>
              <h2 className="font-bold text-xl mb-2">{transaction.event.name}</h2>
              <div className="flex items-center gap-2 mb-1">
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" clipRule="evenodd" />
                </svg>
                <div className="text-gray-600 text-sm">{formatDate(transaction.event.date)} </div>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd" />
                </svg>
                <div className="text-gray-600 text-sm">{formatTimeOnly(transaction.event.start_time) + '-' + formatTimeOnly(transaction.event.end_time)}</div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clipRule="evenodd" />
                </svg>

                <div className="text-gray-600 text-sm">{transaction.event.city.name}</div>
              </div>

            </div>
          </div>
          <div className=" overflow-x-auto mt-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 rounded-s-lg">
                    Jenis Tiket
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Harga
                  </th>
                  <th scope="col" className="px-6 py-3 rounded-e-lg">
                    Jumlah
                  </th>
                </tr>
              </thead>
              <tbody>
                {transaction?.grouped_tickets?.map((ticket: any, index: any) => (
                  <tr key={index} className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {ticket.name}
                    </th>
                    <td className="px-6 py-4">{formatCurrency(ticket.price)}</td>
                    <td className="px-6 py-4">x{ticket.count}</td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </section>
        <h1 className="font-bold text-2xl pt-4 pb-3">Detail Harga</h1>
        <section>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <p>Total Ticket Price</p>
              <p>{formatCurrency(transaction.total_price_tickets)}</p>
            </div>
            {
              transaction.voucher_event &&
              <div className="flex justify-between">
                <p>{transaction.voucher_event.voucher.name}</p>
                <p>{formatCurrency(transaction.voucher_event.voucher.price)}</p>
              </div>
            }
            {
              transaction.coupon_user &&
              <div className="flex justify-between">
                <p>{transaction.coupon_user.coupon.name}</p>
                <p>{formatCurrency(transaction.coupon_user.coupon.price)}</p>
              </div>
            }
            {
              transaction.point_used &&
              <div className="flex justify-between">
                <p>Point Used</p>
                <p>{formatCurrency(transaction.point_used)}</p>
              </div>
            }
            <div className="flex justify-between">
              <p>Total Payment</p>
              <p className="font-bold">{formatCurrency(transaction.total_price)}</p>
            </div>
          </div>
        </section>
        {transaction.payment_proof &&
          <div>
            <h1 className="font-bold text-2xl pt-4 pb-3">Bukti Pembayaran</h1>
            <section>
              <p className="mb-3">{transaction.payment_method.account_name + ' - ' + transaction.payment_method.account_number}</p>
              <Image
                src={transaction.payment_proof}
                width={420}
                height={200}
                alt="bukti bayar"
                className="object-cover rounded-xl"
              />
            </section>
          </div>
        }
        {
          transaction.payment_status == "WAITING_FOR_ADMIN_CONFIRMATION" ?
            <form onSubmit={formik.handleSubmit} >
              <select
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border rounded px-4 py-2 w-full mt-5 mb-10"
              >
                <option disabled value="">Select Status</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              {formik.touched.status && formik.errors.status && (
                <p className="text-red-500 text-sm">{formik.errors.status}</p>
              )}

              {/* <hr className=" text-gray-50 my-10" /> */}
              <div className="flex justify-end">
                <div className="flex gap-2">

                  <Link
                    href={'/panel/transactions'}
                    onClick={() => router.push("/panel/transactions")}
                    className={"bg-gray-50 border border-gray-300 text-gray-400font-semibold px-5 py-3 rounded mb-6"}
                  >
                    Back
                  </Link>
                  <button
                    type="submit"
                    className={`${!(formik.isValid && formik.dirty) || formik.isSubmitting
                      ? "bg-gray-300 text-gray-400"
                      : "bg-blue-900 text-white"
                      }   font-semibold px-5 py-3 rounded mb-6`}
                    disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
                  >
                    {formik.isSubmitting ? "Processing..." : "Submit"}
                  </button>
                </div>
              </div>
            </form>
            :
            <div>
              <hr className=" text-gray-50 my-10" />
              <div className="flex justify-end">
                <div className="flex gap-2">

                  <Link
                    href={'/panel/transactions'}
                    onClick={() => router.push("/panel/transactions")}
                    className={"bg-gray-50 border border-gray-300 text-gray-400font-semibold px-5 py-3 rounded mb-6"}
                  >
                    Back
                  </Link>
                </div>
              </div>
            </div>
        }

      </div>
    ) : (
      <p>No Data</p>
    )
  )
}
