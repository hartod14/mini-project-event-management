import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { getCities } from "@/helpers/handlers/apis/city.api";
import { ICityInterface } from "@/interfaces/city.interface";
import { ICategoryInterface } from "@/interfaces/category.interface";
import { getCategories } from "@/helpers/handlers/apis/category.api";
import { uploadImage } from "@/helpers/handlers/upload";
import { LoadingContext } from "@/context/LoadingContext";
import { useRouter } from "next/navigation";

export default function EventEditViewModel() {
    const [isLoading, setIsLoading] = useState(false);
    const [cities, setCities] = useState<ICityInterface[]>([])
    const [categories, setCategories] = useState<ICategoryInterface[]>([])
    const [image, setImage] = useState<string>("")
    const refImage = useRef<HTMLInputElement>(null);
    const loading = useContext(LoadingContext);
    const router = useRouter()

    const upload = useCallback(
        async (
            e: React.ChangeEvent<HTMLInputElement>,
            setFieldValue: (field: string, value: any) => void
        ) => {
            setIsLoading(true);
            if (e.target.files?.length) {
                const image: File = e.target.files[0];
                const form = new FormData();
                form.append("image", image);

                const resImage = await uploadImage(form);

                setFieldValue("image", resImage.data);
                setImage(resImage.data);
            }
            setIsLoading(false);
        },
        []
    );

    //get cities for options
    async function getCityList() {
        const cities = await getCities();
        setCities(cities.data);
    }

    //get categoriest for options
    async function getCategoryList() {
        const categories = await getCategories();
        setCategories(categories.data)
    }

    useEffect(() => {
        getCityList()
        getCategoryList()

    }, [])

    return {
        cities,
        categories,
        upload,
        refImage,
        loading,
        isLoading,
        image,
        router
    }
}