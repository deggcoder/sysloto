import { redirect } from "react-router-dom";
import { deleteDetail } from "../../data";

export async function destroyAction({ params }) {
    const idTicket = parseInt(params.ticketId);

    await deleteDetail(idTicket, params.number);
    return redirect(`/vendedor/${params.sellerId}/turno/${params.scheduleId}/ventas/${idTicket}`);
}