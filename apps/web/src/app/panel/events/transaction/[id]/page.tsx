'use client'
import ButtonList from '@/components/common/buttons/PanelButtonList'
import { PaginationTable } from '@/components/common/pagination/PaginationTable'
import Table from '@/components/common/table/Table'
import EventListTransactionViewModel from '@/components/Panel/pages/event/list/EventListTransactionViewModel'
import { ArrowLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'

export default function PabelEventTransaction() {
    const { limit, page, router, search, setLimit, setPage, setSearch, table, total, totalPage } = EventListTransactionViewModel()
    return (
        <div className="flex flex-col gap-4 pb-2">
            <Link href={"/panel/events"} className='flex gap-2 items-center text-blue-800 font-semibold mb-4'>
                <ArrowLeftIcon width={24} height={24}></ArrowLeftIcon>
                <p className=' text-lg'>Back</p>
            </Link>
            <div className="flex justify-between">
                <div className="flex bg-[#f0f0f0] rounded-md w-1/4 px-3">
                    <div className="flex justify-center items-center w-[31px]  mr-1">
                        <MagnifyingGlassIcon width={20} height={20} />
                    </div>

                    <input
                        type="text"
                        value={search}
                        placeholder="Search"
                        className=" bg-[#f0f0f0] w-full min-h-[50px] focus:outline-none"
                        name="search"
                        onChange={(e) => setSearch(e.target.value)}
                    />
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
