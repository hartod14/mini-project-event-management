"use client"

import EventsListViewModel from "@/components/Panel/pages/event/list/EventListViewModel";
import ButtonList from "@/components/common/buttons/PanelButtonList";
import { PaginationTable } from "@/components/common/pagination/PaginationTable";
import Table from "@/components/common/table/Table";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";

export default function PanelEvent() {
    const { router, table, page, limit, total, totalPage, search, setSearch, setLimit, setPage } = EventsListViewModel()

    return (
        <div className="flex flex-col gap-4 pb-2">
            <div className="flex justify-between">
                <div className="flex bg-[#f0f0f0] rounded-md w-1/4 px-3">
                    <div className="flex justify-center items-center w-[31px mr-1">
                        <MagnifyingGlassIcon width={20} height={20} />
                    </div>

                    <input
                        type="text"
                        value={search}
                        placeholder="Search"
                        className=" bg-[#f0f0f0] w-full focus:outline-none"
                        name="search"
                        onChange={(e) => setSearch(e.target.value)}
                    // onKeyDown={(e) => {
                    //     // if (e.key == "Enter") {
                    //     setSearch(e.currentTarget.value)
                    //     router.push("/panel/events/?search=" + e.currentTarget.value);
                    //     // }
                    // }}
                    />
                </div>
                <div className="flex gap-2">
                    <ButtonList
                        onAdd={() => {
                            router.push("/panel/events/add");
                        }}
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