export function PageBanner({title, subtitle}) {
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 text-center md:py-16">
        <h1 className="font-heading text-2xl font-extrabold uppercase leading-tight tracking-wide break-words sm:text-3xl md:text-5xl">
          {title}
        </h1>
        {subtitle && <p className="mx-auto mt-3 max-w-2xl text-sm text-white/80 sm:text-base">{subtitle}</p>}
        <div className="mx-auto mt-5 h-1 w-20 bg-gold" />
      </div>
    </section>
  )
}
