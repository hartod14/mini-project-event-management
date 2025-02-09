// import { deleteEvents, getEvents } from "@/axios/repository/admin/events";
import ButtonAction from "@/components/common/buttons/PanelButtonAction";
import { LoadingContext } from "@/context/LoadingContext";
import { panelGetEvents } from "@/helpers/handlers/apis/event.api";
import { IEventInterface } from "@/interfaces/event.interface";
import { log } from "console";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

export default function EventsListViewModel() {
    const [page, setPage] = useState<number>(1)
    const [search, setSearch] = useState<string>('')
    const [limit, setLimit] = useState<number>(15)
    const [total, setTotal] = useState<number>(0)
    const [totalPage, setTotalPage] = useState<number>(0)
    const [table, setTable] = useState({
        head: ["name", "schedule", "location", "action"],
        body: [],
    });
    const router = useRouter();
    const loading = useContext(LoadingContext);

    async function getEventList() {
        loading?.setLoading(true);

        const body: any = [];

        const res = (await panelGetEvents(search, page, limit));
        const data: IEventInterface[] = res.data
        const total_data: number = res.total_data
        // const totalData: number = (await panelGetEvents('', page, limit)).data;

        if (data) {
            data.map((row, index) => {
                body.push([
                    row.name,
                    row.start_date,
                    row.city_id,
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

    }, [page, limit]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearch(search);
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
