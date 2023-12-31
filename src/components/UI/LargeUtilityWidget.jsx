export const LargeUtilityWidget = ({ amount, subtitle = 'Ventas totales', negative = false }) => {
  return (
    <div className="p-4.5 flex justify-between bg-surface-container-high
        rounded-3xl items-end w-full">
        <span className="material-symbols-outlined text-secondary">
            widgets
        </span>
        <div className="flex flex-col gap-2 items-end">
            <h1 className={`text-display-small ${negative ? 'text-error' : 'text-tertiary'}`}>
                C$ {amount}
            </h1>
            <p className="text-body-medium text-on-surface-variant">
                {subtitle}
            </p>
        </div>
    </div>
  )
}
