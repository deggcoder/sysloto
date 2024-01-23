import { createBrowserRouter } from "react-router-dom";
import { PanelSalesDashboard, PanelSalesTopSellers, dashboardLoader, action as rootAction, topSellersLoader } from "../components";
import { PanelSalesTopNumber, topNumberLoader } from "../components/Panel/Sales/TopNumber";
import { createAction } from "./Disburses/Create";
import { deleteDisburseAction } from "./Disburses/Delete";
import { ScreensDisburses, disbursesLoader } from "./Disburses/Disburses";
import { ScreensDisbursesDetails, disbursesDLoader } from "./Disburses/DisbursesDetails";
import ScreensErrorPage from "./Error/ErrorPage";
import { ScreensNumbers, ScreensNumbersDetails, numberDetailLoader, numbersLoader } from "./Numbers";
import { ScreensPanel } from "./Panel";
import { ScreensRoutesRoot, loadSellers } from "./Routes";
import { deleteAction } from "./Sellers/Delete";
import { destroyAction } from "./Sellers/Destroy";
import { ScreensSellersEdit, sellerAction, sellerLoader } from "./Sellers/Edit";
import { ScreensSellers, salesAction, salesLoader } from "./Sellers/Sellers";
import { ScreensSellersDetails, detailsAction, detailsLoader } from "./Sellers/SellersDetails";
import { ScreensSetNumbers, ScreensSetSchdules, ScreensSettingsRoot, setNumbersAction, setNumbersLoader, setScheduleAction, setSchedulesLoader } from "./Settigns";
import { IndexPage } from "./index/IndexPage";
import { SellerIndex } from "./index/SellerIndex";

export const router = createBrowserRouter([
    {
        path: `/`,
        element: <ScreensRoutesRoot />,
        errorElement: <ScreensErrorPage />,
        loader: loadSellers,
        action: rootAction,
        children: [
            { index: true, element: <IndexPage /> },
            {
                path: `panel`,
                element: <ScreensPanel />,
                children: [
                    { index: true, element: <SellerIndex 
                        label="Selleccion" detail="Selleciona una opción y mira el detalle" /> },
                    {
                        path: 'ventas',
                        element: <PanelSalesDashboard />,
                        loader: dashboardLoader,
                    },
                    {
                        path: "v/racha",
                        element: <PanelSalesTopSellers />,
                        loader: topSellersLoader,
                    },
                    {
                        path: "n/racha",
                        element: <PanelSalesTopNumber />,
                        loader: topNumberLoader,
                    },
                ],
            },
            {
                path: `numeros/turno/:scheduleId`,
                element: <ScreensNumbers />,
                loader: numbersLoader,
                children: [
                    { index: true, element: <SellerIndex label="Detalle de número" /> },
                    {
                        path: `detalle/:numberId`,
                        element: <ScreensNumbersDetails />,
                        loader: numberDetailLoader,
                    },
                ],
            },
            {
                path: `desembolsos`,
                element: <ScreensDisburses />,
                loader: disbursesLoader,
                children: [
                    {
                        path: `:winnerId`,
                        element: <ScreensDisbursesDetails />,
                        loader: disbursesDLoader,
                        children: [
                            {
                                path: `delete`,
                                action: deleteDisburseAction,
                                errorElement: <div>Algo salió mal al eliminar el registro</div>,
                            },
                        ],
                    },
                ],
            },
            {
                path: `vendedor/:sellerId/turno/:scheduleId/ventas`,
                element: <ScreensSellers />,
                loader: salesLoader,
                action: salesAction,
                children: [
                    { index: true, element: <SellerIndex label="Detalle de venta" /> },
                    {
                        path: `:ticketId`,
                        element: <ScreensSellersDetails />,
                        loader: detailsLoader,
                        action: detailsAction,
                    },
                    {
                        path: ":ticketId/eliminar/:number",
                        action: destroyAction,
                        errorElement: <div>Algo salió mal al eliminar el registro</div>,
                    },
                ],
            },
            {
                path: 'vendedor/:sellerId',
                element: <ScreensSellersEdit />,
                loader: sellerLoader,
                action: sellerAction,
                children: [
                    {
                        path: 'eliminar',
                        action: deleteAction,
                        errorElement: <div>Algo salió mal al eliminar el registro</div>,
                    },
                ],
            },
            {
                path: 'ganador',
                action: createAction,
            },
        ],
    },
    {
        path: 'sysloto/u/:idUser/settings',
        element: <ScreensSettingsRoot />,
        children: [
            {
                path: "turnos",
                element: <ScreensSetSchdules />,
                loader: setSchedulesLoader,
                action: setScheduleAction,
            },
            {
                path: "numeros",
                element: <ScreensSetNumbers />,
                loader: setNumbersLoader,
                action: setNumbersAction,
            },
        ],
    },
]);