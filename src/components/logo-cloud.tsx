import { clsx } from 'clsx'

export function LogoCloud({
  className,
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsx(
        className,
        'logo-cloud my-12 flex gap-8 max-sm:mx-auto max-sm:max-w-md max-sm:flex-wrap max-sm:justify-evenly max-sm:gap-x-4 max-sm:gap-y-4 lg:my-16',
      )}
    >
      <img
        alt="ace"
        src="./logo-cloud/ace.png"
        className="h-8 max-sm:mx-auto sm:h-8 lg:h-10"
      />
      <img
        alt="hanjan"
        src="./logo-cloud/hanjan.png"
        className="h-8 max-sm:mx-auto sm:h-8 lg:h-10"
      />
    </div>
  )
}
