"use client"

import ButtonList from "@/components/common/buttons/PanelButtonList";
import { PaginationTable } from "@/components/common/pagination/PaginationTable";
import Table from "@/components/common/table/Table";
import EventsListViewModel from "@/components/panel/pages/event/list/EventListViewModel";
import TransactionsListViewModel from "@/components/panel/pages/transaction/list/EventListViewModel";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";

export default function PanelTransaction() {
    const { router, table, page, limit, total, totalPage, status, setStatus, setLimit, setPage } = TransactionsListViewModel()

    return (
        <div className="flex flex-col gap-4 pb-2">
            <div className="flex">
                <div className="flex bg-[#f0f0f0] rounded-md w-1/4 px-3">

                    <select
                        value={status}
                        className="bg-[#f0f0f0] w-full focus:outline-none py-3"
                        name="status"
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="WAITING_FOR_PAYMENT">Waiting for Payment</option>
                        <option value="WAITING_FOR_ADMIN_CONFIRMATION">Waiting for Admin Confirmation</option>
                        <option value="DONE">Done</option>
                        <option value="REJECTED">Rejected</option>
                        <option value="EXPIRED">Expired</option>
                        <option value="CANCELED">Canceled</option>
                    </select>
                </div>
            </div>
            <div className="relative h-[calc(100vh-250px)] overflow-auto">
                <Table body={table.body} head={table.head} />
            </div>
            <PaginationTable
                limit={limit}
                page={page}
                setPage={setPage}
                setLimit={setLimit}
                total={total}
                totalPage={totalPage}
            />
        </div>
    )
}