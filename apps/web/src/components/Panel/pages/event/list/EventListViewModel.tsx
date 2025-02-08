// import { getBanners } from "@/axios/repository/admin/banners";
// import { deleteEvents, getEvents } from "@/axios/repository/admin/events";
import ButtonAction from "@/components/common/buttons/PanelButtonAction";
import { LoadingContext } from "@/context/LoadingContext";
// import { EventsResponse } from "@/models/Events";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

interface EventsResponse {
    id: number;
    name: string;
    schedule: string;
    location: string;
}
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

        const data: EventsResponse[] = [
            {
                id: 1,
                name: 'test',
                location: 'test',
                schedule: 'test',
            },
            {
                id: 2,
                name: 'test2',
                location: 'test2',
                schedule: 'test2',
            },
        ]

        if (data) {
            data.map((row, index) => {
                body.push([
                    row.name,
                    row.location,
                    row.schedule,
                    // <div
                    //     key={"description" + index}
                    //     dangerouslySetInnerHTML={{ __html: row.description }}
                    // />,
                    // <Image
                    //     alt="Events"
                    //     src={row.file_storage.path}
                    //     width={100}
                    //     height={100}
                    //     key={row.file_storage.path}
                    //     className="object-cover"
                    // />,

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
