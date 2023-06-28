export default function Page ({ params }: { params: { campaign: string } }) {
  return (
    <main>
      <h1>Monsters list for campaign {params.campaign}</h1>
    </main>
  )
}
