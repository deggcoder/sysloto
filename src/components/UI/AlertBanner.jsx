export const AlertBanner = ({ text = "Banner info" }) => {
    return (
        <div
            role="banner"
            className="flex gap-4.5 py-4.5 px-4.5 bg-tertiary-fixed-dim rounded-2xl"
        >
            <span className="material-symbols-outlined text-on-tertiary-fixed-variant">
                release_alert
            </span>
            <p
                className="text-body-large text-on-tertiary-fixed-variant"
            >
                { text }
            </p>
        </div>
    )
}
