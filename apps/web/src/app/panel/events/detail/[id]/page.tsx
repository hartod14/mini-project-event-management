import { DisableInput } from "@/components/common/inputs/DisableInputField";
import EventDetailViewModel from "@/components/panel/pages/event/detail/EventDetailEventModel";
import { formatDate, formatTimeOnly } from "@/helpers/format.time";
import { panelGetEventDetail } from "@/helpers/handlers/apis/event.api";

type Props = {
    params: { id: number }
}

export default async function PanelDetailEvent({ params }: Props) {
    // const { event } = EventDetailViewModel((await params).id);

    const event = (await panelGetEventDetail(params.id)).data

    return (
        <div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <DisableInput label="Nama" name={event.name} />
                <DisableInput label="Host Name" name={event.host_name} />
                <DisableInput label="Date" name={formatDate(event.date)} />
                <div className="md:flex gap-2">
                    <DisableInput label="Start Time" name={formatTimeOnly(event.start_time)} />
                    <DisableInput label="End Time" name={formatTimeOnly(event.end_time)} />
                </div>
                <DisableInput label="City" name={event.city.name} />
                <DisableInput label="Category" name={event.event_category.name} />
            </div>
        </div >
    )
}