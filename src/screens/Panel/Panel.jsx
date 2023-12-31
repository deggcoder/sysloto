import { PanelControlPanel } from "../../components";
import { Outlet } from "react-router-dom";

export const ScreensPanel = () => {
  return (
    <>
      <PanelControlPanel />
      <Outlet />
    </>
  )
}
