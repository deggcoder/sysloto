import { createBrowserRouter } from "react-router-dom";
import { ScreensRoutesRoot, loadSellers } from "./Routes";
import ScreensErrorPage from "./Error/ErrorPage";
import { ScreensPanel } from "./Panel";
import { PanelSalesDashboard, action as rootAction } from "../components";
import { ScreensNumbers, numberDetailLoader, numbersLoader } from "./Numbers";
import { ScreensNumbersDetails } from "./Numbers";
import { ScreensDisburses, disbursesLoader } from "./Disburses/Disburses";
import { ScreensDisbursesDetails, disbursesDLoader } from "./Disburses/DisbursesDetails";
import { ScreensSellers, salesAction, salesLoader } from "./Sellers/Sellers";
import { ScreensSellersDetails, detailsAction, detailsLoader } from "./Sellers/SellersDetails";
import { ScreensSellersEdit, sellerAction, sellerLoader } from "./Sellers/Edit";
import { destroyAction } from "./Sellers/Destroy";
import { SellerIndex } from "./index/SellerIndex";
import { IndexPage } from "./index/IndexPage";
import { deleteAction } from "./Sellers/Delete";
import { createAction } from "./Disburses/Create";
import { deleteDisburseAction } from "./Disburses/Delete";

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
                    {
                        path: 'ventas',
                        element: <PanelSalesDashboard />
                    }
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
]);