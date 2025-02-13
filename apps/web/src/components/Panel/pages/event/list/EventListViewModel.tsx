// import { deleteEvents, getEvents } from "@/axios/repository/admin/events";
import ButtonAction from "@/components/common/buttons/PanelButtonAction";
import { LoadingContext } from "@/context/LoadingContext";
import { formatTimeOnly, formatDate } from "@/helpers/format.time";
import { panelGetEvents } from "@/helpers/handlers/apis/event.api";
import { IEventInterface } from "@/interfaces/event.interface";
import { log } from "console";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

export default function EventsListViewModel() {
    const loading = useContext(LoadingContext);
    const [page, setPage] = useState<number>(1)
    const [search, setSearch] = useState<string>('')
    const [limit, setLimit] = useState<number>(15)
    const [total, setTotal] = useState<number>(0)
    const [totalPage, setTotalPage] = useState<number>(0)
    const [table, setTable] = useState({
        head: ["name", "category", "host", "schedule", "location", "status", "action"],
        body: [],
    });
    const router = useRouter();

    async function getEventList() {        
        loading?.setLoading(true);

        const body: any = [];

        const res = (await panelGetEvents(search, page, limit));
        const data: IEventInterface[] = res.data
        const total_data: number = res.total_data
        // const totalData: number = (await panelGetEvents('', page, limit)).data;

        if (data) {
            data.map((row, index) => {
                let date = formatDate(row.date)
                let startTime = formatTimeOnly(row.start_time)
                let endTime = formatTimeOnly(row.end_time)
                body.push([
                    row.name,
                    row.event_category.name,
                    row.host_name,
                    `${date} | ${startTime} - ${endTime}`,
                    row.city.name,
                    row.status == 'ACTIVE' ? <span className="text-green-600">Active</span> : <span className="text-red-600">Inactive</span>,
                    <ButtonAction
                        key={"button"}
                        // onDelete={async () => {
                        //     await deleteEventList(row.id);
                        // }}
                        onShow={() => {
                            router.push(`/panel/events/detail?id=${row.id}`);
                        }}
                        onUpdate={() => {
                            router.push(`/panel/events/edit?id=${row.id}`);
                        }}
                    />,
                ]);
            });

            setTotal(total_data)
            setTotalPage(Math.ceil(total_data / limit))
            setTable({
                ...table,
                body: body,
            });
            loading?.setLoading(false);
        }
    }
    // async function deleteEventList(id: number) {
    //     try {
    //         loading?.setLoading(true);
    //         await deleteEvents(id).then(() => {
    //             getEventList();
    //         });
    //     } catch (error) {
    //     } finally {
    //         loading?.setLoading(false);
    //     }
    // }


    useEffect(() => {
        // console.log(total);
        getEventList();
        // console.log(total);

    }, [page]);

    useEffect(() => {
        // console.log(total);
        setPage(1);
        getEventList();
        // console.log(total);

    }, [limit]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearch(search);
            setPage(1);
            getEventList();
        }, 300);

        return () => clearTimeout(handler);
    }, [search]);

    // useEffect(() => {
    //     getEventList();
    //     // console.log("Updated total:", totalPage);
    // }, [totalPage]);

    return {
        setPage,
        setLimit,
        setSearch,
        search,
        table,
        router,
        page,
        limit,
        total,
        totalPage,
    };
};
