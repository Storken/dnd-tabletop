'use client'

import { useTheme } from 'next-themes'
import { useMemo } from 'react'

type Props = {
  small?: boolean
}

const DarkModeToggle = ({ small }: Props) => {
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === 'dark'

  const toggleMode = () => {
    setTheme(isDarkMode ? 'light' : 'dark')
  }

  const rotation = useMemo(() => {
    return isDarkMode ? 180 : 360
  }, [isDarkMode])

  return (
    <button
      className='rounded-xl bg-transparent border-0 flex flex-nowrap items-center overflow-hidden'
      onClick={toggleMode}
    >
      <div className='w-8 h-8 relative rounded-3xl'>
        <div
          style={{ transform: `rotateZ(${rotation}deg)` }}
          className='transition-all transform-gpu will-change-transform'
        >
          {/** sun */}
          <div className='w-8 h-8 rounded-3xl bg-yellow-400 relative flex items-center justify-center'>
            <div className='absolute w-6 h-6 rounded-xl bg-yellow-200'></div>
          </div>

          {/** moon */}
          <div
            className='w-8 h-8 rounded-3xl bg-slate-100 relative'
            style={{ marginTop: '1px' }}
          >
            <div
              className='absolute w-2 h-2 rounded-xl bg-slate-300 right-2'
              style={{ top: '50%' }}
            ></div>
            <div
              className='absolute w-3 h-3 rounded-xl bg-slate-400 right-3'
              style={{ bottom: '50%' }}
            ></div>
          </div>
        </div>
      </div>
    </button>
  )
}

export default DarkModeToggle
