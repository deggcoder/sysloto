import { redirect } from "react-router-dom";
import { createWinner, deleteDetail } from "../../data";

export async function createAction({ request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const response = await createWinner(data.number, parseInt(data.idShiftSchedule));

    if(response.msgError) {
        alert(
            response.msgError
        );
        return redirect('/');
    }

    return redirect(`/desembolsos`);
}