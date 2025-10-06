import { service } from "@/utils/Dummy"
import ServiceCard from "./ServiceCard"

const ServiceUser = () => {
  return (
    <div className="w-full py-8">
      <h3 className='uppercase text-center text-orange-600 font-bold text-xl'>Our Service</h3>
       <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 place-items-center mt-4">
            {
                service.map((serve,index)=>{
                    return(
                        <ServiceCard  key={index} serve={serve}/>
                    )
                })
            }
        </div>
    </div>
  )
}

export default ServiceUser
