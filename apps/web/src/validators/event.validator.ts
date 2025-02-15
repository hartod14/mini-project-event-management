import * as Yup from "yup";

export const storeEventValidator = Yup.object({
    name: Yup.string().max(100, "Event name cannot exceed 100 characters").required("Event name is required"),
    host_name: Yup.string().max(100, "Host name cannot exceed 100 characters").required("Host name is required"),
    date: Yup.date().required("Event date is required"),
    start_time: Yup.string().required("Start time is required"),
    end_time: Yup.string().required("End time is required").test(
        "end_time", 
        "Start time cannot be after end time", 
        function (value) {
            return !this.parent.start_time || value >= this.parent.start_time;
        }
    ),
    address: Yup.string().required("Address is required"),
    event_category_id: Yup.number().required("Event category is required"),
    city_id: Yup.string().required("City is required"),
    description: Yup.string().nullable(),
    term_condition: Yup.string().nullable(),
    status: Yup.mixed().oneOf(["ACTIVE", "INACTIVE"], "Status must be either ACTIVE or INACTIVE").required("Status is required"),
    image: Yup.string().required("Event image is required"),
    ticket_types: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required("Ticket name is required"),
            price: Yup.number().typeError("Price must be a number").min(0, "Price must be at least 0").required("Ticket price is required"),
            quota: Yup.number().typeError("Quota must be a number").min(1, "Quota must be at least 1").required("Ticket quota is required"),
        })
    ).min(1, "At least one ticket is required"),
});
