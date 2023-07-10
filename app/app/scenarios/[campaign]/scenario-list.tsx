'use client'

import { PrimaryButton } from '@/app/components/buttons'
import useCampaignList, { Scenario } from '@/contexts/campaign-list'

type Props = {
  currentScenario?: Scenario
  onScenarioClick: (scenario: Scenario) => void
}

const ScenarioList = ({ currentScenario, onScenarioClick }: Props) => {
  const { currentCampaign, editCampaign } = useCampaignList()

  const scenarios = currentCampaign?.scenarios

  const onCreateScenario = async () => {
    if (!currentCampaign) return

    const scenarios = [...(currentCampaign?.scenarios ?? [])]
    let newId = 0
    scenarios.forEach(scenario => {
      if (scenario.id >= newId) {
        newId = scenario.id + 1
      }
    })

    await editCampaign({
      ...currentCampaign,
      scenarios: [
        ...scenarios,
        { id: newId, title: `Scenario ${newId}`, grid: 'square-0' }
      ]
    })
  }

  return (
    <div className=''>
      <PrimaryButton onClick={onCreateScenario}>
        <span className='whitespace-nowrap'>Add Scenario</span>
      </PrimaryButton>

      <ul className='mt-8 w-full'>
        {scenarios?.map(scenario => (
          <li key={`scenario-${scenario.id}`} className='w-full mb-2'>
            <button
              onClick={() => onScenarioClick(scenario)}
              className={`px-4 py-2 w-full ${
                currentScenario?.id === scenario.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-100 hover:bg-blue-400 hover:text-white'
              }`}
            >
              {scenario.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ScenarioList
