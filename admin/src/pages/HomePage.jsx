import { assets } from "../assets/assets"
import VisitorsCount from "../components/VisitorsCount"

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 m-auto">
        <div className="bg-black py-12 px-20 mb-10">
          <img className='w-80' src={assets.logo} alt="logo" />
        </div>
        <div>
            <h1 className='font-semibold text-4xl max-[600px]:text-lg my-5'>Yönetici Paneline Hoş Geldiniz</h1>
            <hr className='h-0.5 bg-orange-300 border-none w-[250px] m-auto'/>
        </div>
        <VisitorsCount />
    </div>
  )
}

export default HomePage