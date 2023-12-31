export const ExpandedUtilityWidget = ({ amount, subtitle = 'Ganancias', negative = false }) => {
    return (
      <div className="p-4.5 flex gap-3.5 bg-tertiary-container
          rounded-3xl items-end h-full">
          <span className="material-symbols-outlined">
              widgets
          </span>
          <div className="flex flex-col justify-between items-end h-full">
              <h1 className={`text-display-small ${negative ? 'text-error' : 'text-on-tertiary-container'}`}>
                  C$ {amount}
              </h1>
              <p className="text-body-medium text-tertiary-fixed">
                  {subtitle}
              </p>
          </div>
      </div>
    )
  }