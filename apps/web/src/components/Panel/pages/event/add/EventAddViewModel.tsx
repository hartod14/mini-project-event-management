import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useFormik } from "formik"
import { storeEventValidator } from "@/validators/event.validator";
import { storeEventInit } from "@/helpers/formiks/event.formik";
import { getCities } from "@/helpers/handlers/apis/city.api";
import { ICityInterface } from "@/interfaces/city.interface";
import { ICategoryInterface } from "@/interfaces/category.interface";
import { getCategories } from "@/helpers/handlers/apis/category.api";
import { uploadImage } from "@/helpers/handlers/upload";
import { LoadingContext } from "@/context/LoadingContext";

export default function EventAddViewModel() {
    const [isLoading, setIsLoading] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [cities, setCities] = useState<ICityInterface[]>([])
    const [categories, setCategories] = useState<ICategoryInterface[]>([])
    const [image, setImage] = useState<string>("")
    const refImage = useRef<HTMLInputElement>(null);
    const loading = useContext(LoadingContext);

    const formik = useFormik({
        validationSchema: storeEventValidator,
        initialValues: storeEventInit,
        onSubmit: async (values) => {
            try {
                loading?.setLoading(true)
                setErrMessage("");

                // await register(values);
                setOpen(true);
                formik.resetForm();
            } catch (error) {
                if (error instanceof Error) setErrMessage(error.message);
            }
            
            loading?.setLoading(false)
        },
    });


    const upload = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            setIsLoading(true);
            if (e.target.files?.length) {
                const image: File = e.target.files[0];
                formik.setFieldValue("image", image);
                const form = new FormData();
                form.append("image", image);
                const resImage = await uploadImage(form);
                setImage(resImage.data)
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
        open,
        setOpen,
        errMessage,
        formik,
        cities,
        categories,
        upload,
        refImage,
        isLoading,
        image
    }
}