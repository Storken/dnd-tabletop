'use client'

import { useState } from 'react'
import ScenarioList from './scenario-list'
import { Scenario } from '@/contexts/campaign-list'
import ManageScenario from './manage-scenario'

export default function Page ({ params }: { params: { campaign: string } }) {
  const [currentScenario, setCurrentScenario] = useState<Scenario>()

  const onScenarioClick = (scenario: Scenario) => {
    setCurrentScenario(scenario)
  }

  const onDeleteScenario = () => {
    setCurrentScenario(undefined)
  }

  return (
    <main>
      <div className='flex flex-nowrap'>
        <ScenarioList
          currentScenario={currentScenario}
          onScenarioClick={onScenarioClick}
        />
        <ManageScenario
          currentScenario={currentScenario}
          onDeleteScenario={onDeleteScenario}
        />
      </div>
    </main>
  )
}
