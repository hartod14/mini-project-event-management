import * as Yup from "yup";

export const storeEventValidator = Yup.object({
    name: Yup.string().max(100).required(),
    host_name: Yup.string().max(100).required(),
    date: Yup.date().required(),
    end_time: Yup.string().required().test("end_time", "Start time cannot be after end time", function (value) {
        const { start_time } = this.parent;
        return !start_time || value >= start_time;
    }),
    start_time: Yup.string().required(),
    event_category_id: Yup.number().required(),
    city_id: Yup.string().required(),
    address: Yup.string().required(),
    description: Yup.string().nullable(),
    term_condition: Yup.string().nullable(),
    status: Yup.mixed().oneOf(['ACTIVE', 'INACTIVE']).required(),
    // image: Yup.string().required(),
    tickets: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required("Ticket name is required"),
            price: Yup.number().typeError("Price must be a number").min(0, "Price must be at least 0").required("Price is required"),
            quota: Yup.number().typeError("Quota must be a number").min(1, "Quota must be at least 1").required("Quota is required"),
        })
    ).min(1, "At least one ticket is required")
})