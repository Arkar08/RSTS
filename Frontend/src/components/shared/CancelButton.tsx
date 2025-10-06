import type { CancelBtnProps } from '@/utils/Constant'
import { Button } from '../ui/button'

const CancelButton = ({title,cancelClick}:CancelBtnProps) => {
  return (
        <Button className="bg-red-600 hover:bg-red-500 opacity-80 hover:opacity-100 cursor-pointer w-[120px]" onClick={cancelClick}>
            {title}
        </Button>
  )
}

export default CancelButton
