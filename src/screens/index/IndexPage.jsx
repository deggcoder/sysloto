export const IndexPage = () => {
  return (
    <section
      className="flex flex-col overflow-auto gap-3.5 bg-surface-container-low
                rounded-t-2xl flex-1 pb-4.5 items-center"
    >
      <div
        className="px-4.5 py-12 flex flex-col text-surface-variant items-center"
      >
        <h1
          className="text-display-small"
        >
          {'Inicio'}
        </h1>
        <p
          className="text-title-large"
        >
          {'Navega usando la barra lateral izquierda'}
        </p>
      </div>
      <div
        className="w-96 flex flex-col gap-1 bg-surface-container h-24 rounded-3xl p-6"
      >
        <div
          className="w-full p-3 bg-surface-container-high rounded-full"
        ></div>
        <div
          className="w-1/2 p-3 bg-surface-container-high rounded-full"
        ></div>
      </div>
      <div
        className="w-96 flex flex-col gap-1 bg-surface-container h-24 rounded-3xl p-6"
      >
        <div
          className="w-full p-3 bg-surface-container-high rounded-full"
        ></div>
        <div
          className="w-1/2 p-3 bg-surface-container-high rounded-full"
        ></div>
      </div>
      <div
        className="w-90 bg-surface-container h-20 rounded-3xl"
      ></div>
      <div
        className="w-80 bg-surface-container h-16 rounded-3xl"
      ></div>
      <div
        className="w-72 bg-surface-container h-14 rounded-3xl"
      ></div>
      <div
        className="w-64 bg-surface-container h-10 rounded-3xl"
      ></div>
    </section>
  )
}
