import * as Yup from "yup";

export const storeEventValidator = Yup.object({
    event_category_id: Yup.number().required(),
    city_id: Yup.string().required(),
    name: Yup.string().max(100).required(),
    host_name: Yup.string().max(100).required(),
    address: Yup.string(),
    description: Yup.string().nullable(),
    term_condition: Yup.string().nullable(),
    date: Yup.date().required(),
    start_time: Yup.string().required(),
    end_time: Yup.string().required().test("end_time", "Start time cannot be after end time", function (value) {
        const { start_time } = this.parent;
        return !start_time || value >= start_time;
    }),
    status: Yup.string().required(),
    image: Yup.string().required(),
    map_image: Yup.string().nullable(),
})