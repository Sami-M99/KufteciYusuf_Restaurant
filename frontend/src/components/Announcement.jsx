/* eslint-disable react/prop-types */
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from 'react-router-dom';

const Announcement = () => {

    const { announcement_list, url } = useContext(StoreContext);
    const navigate = useNavigate();

    if (!Array.isArray(announcement_list)) {
        return <div>Loading...</div>;
    }

  return (
    <div id="announcement_list" className="flex flex-col gap-5 max-[600px]:gap-3 ">
        <h1 className='font-semibold text-4xl max-[600px]:text-lg my-5'>Duyurular & Haberler</h1>
        <div className="flex justify-between items-center gap-3 text-center my-5 overflow-x-auto">
            {
                announcement_list.map((el, index) => {
                    return (
                        <div 
                            key={index} 
                            className="flex flex-col text-start bg-gray-100 p-5 rounded" 
                            onClick={() => navigate(`/announcement/${el.slug}`)}
                            >
                            <img 
                                src={`${url}/images/${el.image}`}
                                alt={el.title} 
                                className={`w-12 min-w-64 cursor-pointer rounded transition-all m-auto`} 
                                />
                            <p className="mt-3 cursor-pointer font-semibold">{el.title}</p>
                            <p className="mt-3 cursor-pointer text-sm">{el.description.slice(0,100)} ...</p>
                            <a className="mt-3 cursor-pointer text-xs text-end text-[#fa9628]">Devamını Okuyun</a>
                        </div>
                    )
                })
            }
        </div>
    </div>
  );
}

export default Announcement;
