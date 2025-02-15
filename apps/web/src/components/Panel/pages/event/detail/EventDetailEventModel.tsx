"use client"

import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { getCities } from "@/helpers/handlers/apis/city.api";
import { ICityInterface } from "@/interfaces/city.interface";
import { ICategoryInterface } from "@/interfaces/category.interface";
import { getCategories } from "@/helpers/handlers/apis/category.api";
import { uploadImage } from "@/helpers/handlers/upload";
import { LoadingContext } from "@/context/LoadingContext";
import { useRouter } from "next/navigation";
import { IEventInterface } from "@/interfaces/event.interface";
import { panelGetEventDetail } from "@/helpers/handlers/apis/event.api";



export default function EventDetailViewModel(id: number) {
    const [event, setEvent] = useState<IEventInterface | null>(null);

    // const [isLoading, setIsLoading] = useState(false);
    // const [cities, setCities] = useState<ICityInterface[]>([])
    // const [categories, setCategories] = useState<ICategoryInterface[]>([])
    // const [image, setImage] = useState<string>("")
    // const refImage = useRef<HTMLInputElement>(null);
    // const loading = useContext(LoadingContext);
    // const router = useRouter()

    async function getEventDetail() {
        const res = await panelGetEventDetail(id);
        setEvent(res.data);
    }

    useEffect(() => {
        getEventDetail()
    }, [id])

    return {
        // cities,
        // categories,
        // refImage,
        // loading,
        // isLoading,
        // image,
        // router,
        event
    }
}