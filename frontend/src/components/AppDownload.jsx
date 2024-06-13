import { assets } from "../assets/assets"

const AppDownload = () => {
  return (
    <div id="app-download" className="m-auto mt-20 text-4xl text-center font-medium max-[600px]:text-2xl">
        <p >Daha iyi kullanım için Uygulamayı indirebilirsiniz.</p>
        <div className="flex justify-center gap-8  mt-9 max-[600px]:flex-col max-[600px]:items-center max-[600px]:gap-3">
            <img src={assets.app_store} alt="app_store" className="transition cursor-pointer hover:scale-105 max-[600px]:w-56"/>
            <img src={assets.play_store} alt="play_store" className="transition cursor-pointer hover:scale-105 max-[600px]:w-56" />
        </div>
    </div>
  )
}

export default AppDownload