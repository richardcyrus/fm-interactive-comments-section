import Avatar from '@/components/Avatar/Avatar'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'
import { recreateDB } from '@/models/db'
import { getUser, getUsers } from '@/models/users'
import { useLiveQuery } from 'dexie-react-hooks'
import { Check, ChevronsUpDown, RotateCcw } from 'lucide-react'
import * as React from 'react'

function UserSwitcher(props: { currentUser: string }) {
  const users = useLiveQuery(() => getUsers(), [])
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(props.currentUser)
  const user = useLiveQuery(() => getUser(value), [value])
  const { login } = useAuth()

  return (
    <div className="user-switcher flex min-h-16 flex-row items-center justify-center gap-x-4 rounded-r-xl bg-white">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="h-10 w-10 rounded-full p-0"
              onClick={async () => {
                await recreateDB()
                login('juliusomo')
                setValue('juliusomo')
              }}
            >
              <RotateCcw />
              <span className="sr-only">Reset Environment</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Reset Environment</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-[52px] w-[200px] justify-between"
          >
            {user ? (
              <>
                <Avatar
                  username={user?.username}
                  imageUrl={user?.image.webp || ''}
                />
                {user.username}
              </>
            ) : (
              'Select User'
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search user..." />
            <CommandList>
              <CommandEmpty>No user found.</CommandEmpty>
              <CommandGroup>
                {users?.map((user) => (
                  <CommandItem
                    key={user.username}
                    value={user.username}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue)
                      login(currentValue)
                      setOpen(false)
                    }}
                    className="grid grid-cols-[16px_minmax(0,40px)_1fr] gap-x-2"
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === user.username ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    <Avatar
                      username={user.username}
                      imageUrl={user.image.webp || ''}
                    />
                    {user.username}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default UserSwitcher
