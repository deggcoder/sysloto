import { redirect } from "react-router-dom";
import { deleteSeller } from "../../data";

export async function deleteAction({ params }) {
    const idSeller = parseInt(params.sellerId);

    await deleteSeller(idSeller);
    return redirect(`/`);
}