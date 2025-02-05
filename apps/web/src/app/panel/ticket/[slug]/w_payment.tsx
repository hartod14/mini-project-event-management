"use client"

import StatusBadge from "@/components/common/badges/StatusBadge";
import PanelButton from "@/components/common/buttons/PanelButton";
import Countdown from "@/components/Panel/ticket/Countdown";
import Image from "next/image";
import { useParams } from "next/navigation"

export default function PanelTicketDetail2() {
    const targetDate = new Date("2025-02-04T14:00:00").getTime(); // This value could be dynamic
    const params = useParams<{ slug: string }>();
    return (
        <>
            <StatusBadge status={"waiting_for_payment"} />
            <section>
                <div className="">
                    <h1 className="text-center pt-5 pb-3">Sisa Waktu Pembayaran</h1>
                    <div className="flex justify-center items-center">
                        <Countdown targetTimestamp={targetDate} />
                    </div>
                    <p className="my-3 text-center">
                        Complete your payment before Sat, Jan 25, 2025, at 06:36 PM.
                    </p>
                    <div className="flex gap-48 my-8 items-center justify-center">
                        <div className="">
                            <p>Total Pembayaran</p>
                            <p className="font-semibold">Rp 200.000</p>
                        </div>
                        <div className="">
                            <p>No. Tujuan</p>
                            <p className="font-semibold">BCA - 86421322485</p>
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <PanelButton color={'primary'} textColor={'text-white'} name={"Upload Bukti Pembayaran"} />
                    </div>

                </div>
            </section>
            <hr className="border-t border-gray-200 my-4" />
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
                        <h2 className="font-bold text-xl mb-2">A Musical Drama: Symphony of Dreams </h2>
                        <div className="flex items-center gap-2 mb-1">
                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" clipRule="evenodd" />
                            </svg>
                            <div className="text-gray-600 text-sm">25 Januari 2024 </div>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd" />
                            </svg>
                            <div className="text-gray-600 text-sm">13:00 - 15:00</div>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clipRule="evenodd" />
                            </svg>

                            <div className="text-gray-600 text-sm">Jakarta</div>
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
                            <tr className="bg-white dark:bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    VIP
                                </th>
                                <td className="px-6 py-4">
                                    Rp 350.000
                                </td>
                                <td className="px-6 py-4">
                                    x2
                                </td>
                            </tr>
                            <tr className="bg-white dark:bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Standar
                                </th>
                                <td className="px-6 py-4">
                                    Rp 200.000
                                </td>
                                <td className="px-6 py-4">
                                    x2
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </section>
        </>
    )
}