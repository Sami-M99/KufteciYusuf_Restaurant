const Header = () => {
  return (
    <div 
        style={{ backgroundImage: "url('./src/assets/header_img.png')" }}
        className="h-[34vw] my-8 mx-auto bg-cover bg-no-repeat relative rounded-xl text-white shadow-md">
        <div className=" absolute flex flex-col items-start gap-[1.5vw] max-w-[50%] bottom-[10%] left-[6vw] animate-[fadeIn_1.5s_ease-in-out]  max-[850px]:max-w-[65%]">
            <h2 className="font-medium text-5xl max-[1100px]:text-4xl  max-[850px]:text-3xl max-[600px]:text-lg">En sevdiğiniz yemeği buradan sipariş edin</h2>
            <p className="text-sm max-[850px]:hidden">Köfteci Yusuf A.Ş. kurumsal yapılanması ile hizmet verdiğimiz tüm şehirlerde “taze lezzetleri, esnaf ilgisiyle hızlı ve hesaplı sunarak müşterilerimizi memnun etmek’’ kalite yönetim sistemlerimizin temel amacıdır.</p>
            <button className="border-none bg-orange-400 font-medium px-5 py-3 rounded-full max-[600px]:px-1 max-[600px]:py-1 max-[600px]:text-xs">Menü Göster</button>
        </div>
    </div>
  )
}

export default Header