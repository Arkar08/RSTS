import type { DashboardProps } from "@/utils/Constant"

const DashboardCard = ({background,title,length}:DashboardProps) => {
  return (
    <div className="rounded-md shadow-md flex flex-col justify-center items-center gap-2" style={{backgroundColor:background}}>
      <h3 className="text-white text-xl">{title}</h3>
      <p className="text-white text-xl">{length}</p>
    </div>
  )
}

export default DashboardCard
