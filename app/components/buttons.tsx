type Props = {
  children: React.ReactNode
  onClick: () => void
  className?: string
  disabled?: boolean
}

export const PrimaryButton = ({
  onClick,
  children,
  className,
  disabled
}: Props) => (
  <button
    onClick={onClick}
    disabled={disabled}
    type='submit'
    className={`text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-400 ${className}`}
  >
    {children}
  </button>
)

export const IconButton = ({
  onClick,
  children,
  className,
  disabled
}: Props) => (
  <button
    onClick={onClick}
    disabled={disabled}
    type='submit'
    className={`text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${className}`}
  >
    {children}
  </button>
)
