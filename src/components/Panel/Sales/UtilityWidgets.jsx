import { ExpandedUtilityWidget, LargeUtilityWidget } from "../../UI"

export const PanelSalesUtilityWidgets = ({ 
    description, positiveAmount, negativeAmount, count 
}) => {
  return (
    <div className="flex flex-col gap-2 px-4.5">
        <p className="text-body-large">{description}</p>
        <div className="flex gap-2">
            <div className="flex flex-col flex-1 gap-2">
                <LargeUtilityWidget
                    amount={positiveAmount}
                />
                <LargeUtilityWidget
                    amount={negativeAmount}
                    negative={true}
                    subtitle="Desembolso total"
                />
            </div>
            <ExpandedUtilityWidget
                amount={positiveAmount - negativeAmount}
            />
        </div>
    </div>
  )
}
