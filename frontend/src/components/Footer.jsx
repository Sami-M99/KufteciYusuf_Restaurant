import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div id='footer' className='bg-[#101010] text-gray-300  flex flex-col items-center gap-5 pt-16 pb-5 mt-16'>
        <div className='w-4/5 m-auto grid grid-cols-[2fr_1fr_1fr] gap-20 max-[750px]:flex max-[750px]:flex-col max-[750px]:gap-5'>
            <div className='flex flex-col items-start gap-5'>
                <img src={assets.logo} alt='logo' />
                <p>Köfteci Yusuf markası ve restoranları, Temmuz 2015’te Hürriyet Gazetesi’nin Kelebek ekinde seçilen ‘’Türkiye’nin En İyi 10 Yol Lokantası’’ sıralamasında birinci seçilerek, Türkiye’nin en güvenilir restoran markası olmuştur.</p>
                <div className='flex gap-3 cursor-pointer'>
                    <img src={assets.facebook_icon} alt='facebook_icon' />
                    <img src={assets.twitter_icon} alt='twitter_icon' />
                    <img src={assets.linkedin_icon} alt='linkedin_icon' />
                </div>
            </div>
            <div className='flex flex-col items-start gap-5'>
                <h2 className='text-white font-semibold text-2xl'>Köfteci Yusuf</h2>
                <ul>
                    <li className='mb-2 cursor-pointer'>Home</li>
                    <li className='mb-2 cursor-pointer'>About us</li>
                    <li className='mb-2 cursor-pointer'>Delivery</li>
                    <li className='mb-2 cursor-pointer'>Privacy policy</li>
                </ul>
            </div>
            <div className='flex flex-col items-start gap-5'>
                <h2 className='text-white font-semibold text-2xl'>Get In Touch</h2>
                <ul>
                    <li className='mb-2'>+90 539 730 17 34</li>
                    <li className='mb-2'>sami.m20304@gmail.com</li>
                </ul>
            </div>
            
        </div>
        <hr className='w-[80%]  h-0.5 mt-3'/>
        <p>Copyright 2024 -- Sami Al-Shami.</p>
    </div>
  )
}

export default Footer