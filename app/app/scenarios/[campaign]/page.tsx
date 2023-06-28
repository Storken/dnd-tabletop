export default function Page ({ params }: { params: { campaign: string } }) {
  return (
    <main>
      <h1>Scenarios list for campaign: {params.campaign}</h1>
    </main>
  )
}
