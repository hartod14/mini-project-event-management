import * as Yup from "yup";

export const storeEventValidator = Yup.object({
    event_category_id: Yup.number().required(),
    city_id: Yup.string().required(),
    name: Yup.string().max(100).required(),
    host_name: Yup.string().max(100).required(),
    address: Yup.string(),
    description: Yup.string().nullable(),
    term_condition: Yup.string().nullable(),
    start_date: Yup.date().required(),
    end_date: Yup.date().required().test("end_date", "Start date cannot be after end date", function (value) {
        const { start_date } = this.parent;
        return !start_date || value >= start_date;
    }),
    status: Yup.string().required(),
    image: Yup.string().required(),
    map_image: Yup.string().nullable(),
})