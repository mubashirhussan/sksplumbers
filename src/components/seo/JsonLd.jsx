export function JsonLd({data}) {
  if (!data) return null
  const schemas = Array.isArray(data) ? data : [data]
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
        />
      ))}
    </>
  )
}
