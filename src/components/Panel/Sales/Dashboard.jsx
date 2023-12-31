import { PanelSalesList } from "./List"
import { NavBar } from "./NavBar"
import { PanelSalesUtilityWidgets } from "./UtilityWidgets"

export const PanelSalesDashboard = () => {
  return (
    <section className="flex flex-col overflow-auto gap-3.5 bg-surface-container-low
      rounded-t-2xl flex-1 pb-4.5">
      <header className="flex justify-between items-center
        px-4.5 pt-4.5 pb-2 relative">
          <div className="flex flex-col">
            <h3 className="text-headline-small">Ventas</h3>
            <p className="text-primary50">[Fecha]</p>
          </div>
          <button className="p-2 rounded-full flex items-center
            material-symbols-outlined hover:bg-surface-container-high">
            more_vert
          </button>
      </header>

      <NavBar />
      <div className="flex flex-col gap-6 py-2">
        <PanelSalesUtilityWidgets 
          positiveAmount={5000}
          negativeAmount={1500}
        />
        <PanelSalesList list={list} />
      </div>
    </section>
  )
}

const list = [
  { id: 1, number: '00', schedule: 'Diurno', amount: 120 },
  { id: 2, number: '10', schedule: 'Diurno', amount: 150 },
  { id: 2, number: '99', schedule: 'Diurno', amount: 12 },
];