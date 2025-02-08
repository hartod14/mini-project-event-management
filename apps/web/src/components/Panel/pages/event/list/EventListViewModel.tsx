// import { deleteEvents, getEvents } from "@/axios/repository/admin/events";
import ButtonAction from "@/components/common/buttons/PanelButtonAction";
import { LoadingContext } from "@/context/LoadingContext";
import { panelGetEvents } from "@/helpers/handlers/apis/event.api";
import { IEventInterface } from "@/interfaces/event.interface";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

export default function EventsListViewModel() {
    const [table, setTable] = useState({
        head: ["name", "schedule", "location", "action"],
        body: [],
    });
    const router = useRouter();
    const loading = useContext(LoadingContext);

    async function getEventList() {
        loading?.setLoading(true);

        const body: any = [];

        const data: IEventInterface[] = (await panelGetEvents()).data;

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
        getEventList();
    }, []);

    return {
        table,
        router,
    };
};
