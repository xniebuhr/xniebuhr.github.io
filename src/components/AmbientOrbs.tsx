/**
 * Large, heavily blurred teal wisps — background motion only.
 */
export function AmbientOrbs() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      <div className="orb orb-a absolute h-[min(420px,48vw)] w-[min(420px,48vw)]" />
      <div className="orb orb-b absolute h-[min(360px,42vw)] w-[min(360px,42vw)]" />
      <div className="orb orb-c absolute h-[min(460px,52vw)] w-[min(460px,52vw)]" />
      <div className="orb orb-d absolute h-[min(300px,36vw)] w-[min(300px,36vw)]" />
      <div className="orb orb-e absolute h-[min(400px,46vw)] w-[min(400px,46vw)]" />
      <div className="orb orb-f absolute h-[min(340px,40vw)] w-[min(340px,40vw)]" />
    </div>
  )
}
