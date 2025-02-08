"use client"

import ButtonList from "@/components/common/buttons/PanelButtonList";
import Table from "@/components/common/table/Table";
import EventsListViewModel from "@/components/Panel/pages/event/list/EventListViewModel";

export default function PanelEvent() {
    const { router, table } = EventsListViewModel()
    return (
        <div className="flex flex-col gap-4 ">
            <ButtonList
                onAdd={() => {
                    router.push("/panel/events/add");
                }}
            />
            <div className="relative h-[calc(100vh-250px)] overflow-auto">
                <Table body={table.body} head={table.head} />
            </div>
        </div>
    )
}