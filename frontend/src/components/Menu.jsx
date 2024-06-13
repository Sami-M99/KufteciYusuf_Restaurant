/* eslint-disable react/prop-types */
import { menu_list } from "../assets/assets"
const Menu = ({category, setCategory}) => {
  return (
    <div id="menu_list" className="flex flex-col gap-5 max-[600px]:gap-3 scrollbar-webkit overflow-auto p-2">
        <div className="flex justify-between items-center gap-3 text-center my-5 overflow-x-auto">
            {
                menu_list.map((el, index) => {
                    return (
                        <div 
                            key={index} 
                            className="flex flex-col items-center h-40" 
                            onClick={() => setCategory(prev => prev === el.menu_name ? "All" : el.menu_name)}>
                            <img 
                                src= {el.menu_image} 
                                alt={el.menu_name} 
                                className={`w-12 min-w-32 cursor-pointer rounded-lg transition-all ${category === el.menu_name ? "border-[3px] border-orange-500 p-[1px]":""}`} 
                                />
                            <p className=" cursor-pointer">{el.menu_name}</p>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Menu