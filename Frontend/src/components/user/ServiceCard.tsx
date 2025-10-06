

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ServiceCard = ({serve}:any) => {
  return (
    <div className="w-[340px] h-[200px] bg-[#3d4444] rounded-md p-4 mx-auto">
        <div className="flex justify-center items-center">
            <img src={serve.image} alt="order" className="w-[80px] h-[80px] rounded-md"/>
        </div>
        <div className="p-2">
            <h3 className="text-center text-xl text-white">{serve.header}</h3>
            <p className="text-center text-sm mt-2 text-gray-400">{serve.text}</p>
        </div>
    </div>
  )
}

export default ServiceCard
