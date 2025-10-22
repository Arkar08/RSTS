import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { Input } from '../ui/input'
import type { HeaderProps } from '@/utils/Constant'

const Header = ({title,plusClick,searchInput,value}:HeaderProps) => {
  return (
    <div className="h-[60px] border-2 rounded-md flex justify-between items-center px-4 shadow-md">
        <h3 className="text-xl">{title}</h3>
        {
            title === 'Orders' ? (
                <div className='size-9'></div>
            ):(
                <>
                    <Input placeholder={`Enter ${title}`} className='max-w-[400px]' value={value} onChange={(event)=>searchInput(event)}/>
                    {
                        title !== 'User Listings' ? (
                            <Button  size="icon" className="size-9 cursor-pointer hover:opacity-80" onClick={plusClick}>
                                <Plus />
                            </Button>
                        ):(
                            <div></div>
                        )
                    }
                </>
            )
        }
    </div>
  )
}

export default Header
