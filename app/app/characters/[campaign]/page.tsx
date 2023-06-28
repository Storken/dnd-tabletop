export default function Page ({ params }: { params: { campaign: string } }) {
  return (
    <main>
      <h1>Characters list for campaign: {params.campaign}</h1>
    </main>
  )
}
