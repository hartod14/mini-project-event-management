"use client"

import ButtonList from "@/components/common/buttons/PanelButtonList";
import EventsListViewModel from "@/components/Panel/pages/event/list/EventListViewModel";
import EventsListView from "@/components/Panel/pages/event/list/EventsListView";

export default function PanelEvent() {
    const { router, table } = EventsListViewModel()
    return (
        <div className="flex flex-col gap-4 ">
            <ButtonList
                onAdd={() => {
                    router.push("/admin/events/add");
                }}
            />
            <div className="relative h-[calc(100vh-250px)] overflow-auto">
                {/* <Table body={table.body} head={table.head} /> */}
            </div>
        </div>
    )
}