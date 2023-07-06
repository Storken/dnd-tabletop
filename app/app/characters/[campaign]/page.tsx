import CharacterList from './character-list'

export default function Page ({ params }: { params: { campaign: string } }) {
  return (
    <main>
      <h1>Player Characters</h1>
      <CharacterList />
      <h1>Non-Player Characters</h1>
    </main>
  )
}
