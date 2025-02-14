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
import Swal from "sweetalert2";
import { createEvent } from "@/helpers/handlers/apis/event.api";
import { useRouter } from "next/navigation";

export type Ticket = {
    name: string;
    price: string;
    quota: string;
};

type FormValues = {
    event_category_id: string;
    city_id: string;
    name: string;
    host_name: string;
    address: string;
    description: string;
    term_condition: string;
    date: string;
    start_time: string;
    end_time: string;
    status: string;
    image: string;
    tickets: Ticket[];
};

export default function EventAddViewModel() {
    const [isLoading, setIsLoading] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [cities, setCities] = useState<ICityInterface[]>([])
    const [categories, setCategories] = useState<ICategoryInterface[]>([])
    const [image, setImage] = useState<string>("")
    const refImage = useRef<HTMLInputElement>(null);
    const loading = useContext(LoadingContext);
    const router = useRouter()

    const formik = useFormik({
        validationSchema: storeEventValidator,
        validateOnChange: true,
        initialValues: storeEventInit,
        onSubmit: async (values) => {
            Swal.fire({
                title: "Save this new event?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, save it!",
                cancelButtonText: "Cancel"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        loading?.setLoading(true);
                        setErrMessage("");

                        const res = await createEvent(values);
                        if (res?.error) {
                            setErrMessage(res.error);
                        } else {
                            formik.resetForm();
                        }
                    } catch (error) {
                        if (error instanceof Error) {
                            setErrMessage(error.message);
                        }
                    } finally {
                        Swal.fire({
                            title: "Saved!",
                            text: "Your new event has been created.",
                            icon: "success",
                            confirmButtonColor: "#3085d6",
                        }).then(() => {
                            router.push("/panel/events");
                        });

                        loading?.setLoading(false);
                    }
                }
            });
        },
    });



    const upload = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            setIsLoading(true);
            if (e.target.files?.length) {
                const image: File = e.target.files[0];
                const form = new FormData();
                form.append("image", image);
                const resImage = await uploadImage(form);
                formik.setFieldValue("image", resImage.data);
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
        cities,
        categories,
        upload,
        refImage,
        isLoading,
        image
    }
}