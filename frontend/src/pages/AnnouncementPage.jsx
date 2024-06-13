// import { useContext } from "react";
// import { StoreContext } from "../context/StoreContext";

// const AnnouncementPage = () => {
//     const { announcement_list, url } = useContext(StoreContext);

//     const duyuru = announcement_list.filter((item) => {
//         return item._id === 
//     })

//     return (
//         <div className="flex justify-between items-center gap-3 text-center my-5 overflow-x-auto">
//         {
//             announcement_list.filter((el, index) => {
//                 return (
//                     <div 
//                         key={index} 
//                         className="flex flex-col text-start bg-gray-100 p-5" 
//                         // onClick={() => }
//                         >
//                         <img 
//                             src={`${url}/images/${el.image}`}
//                             alt={el.title} 
//                             className={`w-12 min-w-64 cursor-pointer rounded transition-all m-auto`} 
//                             />
//                         <p className="mt-3 cursor-pointer font-semibold">{el.title}</p>
//                         <p className="mt-3 cursor-pointer text-sm">{el.description.slice(0,100)} ...</p>
//                         <a className="mt-3 cursor-pointer text-xs text-end text-[#fa9628]">Devamını Okuyun</a>
//                     </div>
//                 )
//             })
//         }
//         </div>
//     )
// }

// export default AnnouncementPage

import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const AnnouncementPage = () => {
    // const { id } = useParams();
    const { slug } = useParams();
    const { announcement_list, url } = useContext(StoreContext);

    const announcement = announcement_list.find(ann => ann.slug === slug);

    if (!announcement) {
        return <div>Announcement not found</div>;
    }

    return (
        <div className="p-5 flex gap-10">
            <img 
                src={`${url}/images/${announcement.image}`} 
                alt={announcement.title} 
                className="w-full max-w-xl m-auto rounded" 
            />
            <div>
                <h1 className="text-2xl font-bold mt-5">{announcement.title}</h1>
                <p className="mt-3">{announcement.description}</p>
                <p className="mt-3 text-gray-500 text-end">{announcement.date.split('T')[0]} {announcement.date.split('T')[1].slice(0,8)}</p>
            </div>
        </div>
    );
}

export default AnnouncementPage;
