import React from 'react'
// import Table from '@/components/common/table/Table';
import EventsListViewModel from './EventListViewModel';
import ButtonList from '@/components/common/buttons/PanelButtonList';

export default function EventsListView() {
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