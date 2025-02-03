export interface IStatusBadgeProps {
    status: "waiting_for_payment" | "waiting_for_admin_confirmation" | "done" | "rejected" | "expired" | "canceled";
}