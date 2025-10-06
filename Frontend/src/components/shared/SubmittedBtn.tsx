
import type { SubmittedBtnProps } from '@/utils/Constant'
import { Button } from '../ui/button'

const SubmittedBtn = ({title}:SubmittedBtnProps) => {
  return (
        <Button className="bg-green-600 hover:bg-green-500 cursor-pointer w-[120px]">
            {title}
        </Button>
  )
}

export default SubmittedBtn
