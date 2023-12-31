import { PanelControlPanelHeader } from "./ControlPanel/Header"
import { PanelControlPanelList } from "./ControlPanel/List"

export const PanelControlPanel = () => {
    return (
        <div
            className='flex flex-col gap-3.5 p-4.5
        bg-surface rounded-t-2xl max-w-[360px] min-w-[260px]'
        >
            <PanelControlPanelHeader />
            <PanelControlPanelList />

        </div>
    )
}
