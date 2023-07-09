import PlayerList from './player-list'

export default function Page ({ params }: { params: { campaign: string } }) {
  return (
    <main>
      <h1>Players</h1>
      <PlayerList />
    </main>
  )
}
