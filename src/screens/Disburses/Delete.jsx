import { redirect } from "react-router-dom";
import { deleteWinner } from "../../data";

export async function deleteDisburseAction({ params }) {
    const idWinner = parseInt(params.winnerId);

    await deleteWinner(idWinner);
    return redirect(`/desembolsos`);
}