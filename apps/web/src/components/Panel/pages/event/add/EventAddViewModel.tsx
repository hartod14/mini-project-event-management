import React, { useEffect, useState } from "react";
import { useFormik } from "formik"
import { storeEventValidator } from "@/validators/event.validator";
import { storeEventInit } from "@/helpers/formiks/event.formik";
import { getCities } from "@/helpers/handlers/apis/city.api";
import { ICityInterface } from "@/interfaces/city.interface";
import { ICategoryInterface } from "@/interfaces/category.interface";
import { getCategories } from "@/helpers/handlers/apis/category.api";

export default function EventAddViewModel() {
    const [errMessage, setErrMessage] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [cities, setCities] = useState<ICityInterface[]>([])
    const [categories, setCategories] = useState<ICategoryInterface[]>([])

    const formik = useFormik({
        validationSchema: storeEventValidator,
        initialValues: storeEventInit,
        onSubmit: async (values) => {
            try {
                setErrMessage("");
                // await register(values);
                setOpen(true);
                formik.resetForm();
            } catch (error) {
                if (error instanceof Error) setErrMessage(error.message);
            }
        },
    });

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
    }
}