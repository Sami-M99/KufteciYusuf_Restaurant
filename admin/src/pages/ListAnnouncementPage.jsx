/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { assets } from "../assets/assets";


const ListAnnouncementPage = ({url}) => {
  const [list, setList] = useState([]);

  const getAnnouncementList = async () => {
    const response = await axios.get(`${url}/announcement/all-announcement`);
    
    if(response.data.success){
      setList(response.data.data);
    }
    else {
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    getAnnouncementList();
  }, [])

  const removeAnnouncement = async (announcementId) => {
    const response = await axios.post(`${url}/announcement/delete-announcement`, {id: announcementId});
    await getAnnouncementList();  // to display announcement list again after remove announcement

    if(response.data.success){
      toast.success(response.data.message);
    }
    else {
      toast.error(response.data.message);
    }
  }

  return (
    <div className="mx-12 w-full">
      <h1 className="mt-10 mb-5 m-auto font-semibold text-3xl text-center">Tüm Duyuruların Listesi</h1>
        <div className="">
          <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-2.5 py-3 px-4 border border-[#fa9628] bg-[#fff2e4] max-[600px]:grid-cols-[1fr_3fr_1fr] max-[600px]:gap-4 max-[600px]:hidden justify-items-center">
            <b>Image</b>
            <b>Başlık</b>
            <b>İçerik</b>
            <b>Tarih</b>
            <b>Silme İşlemi</b>
          </div>
          { list.map((item, index) => {
            return (
              <div key={index} className="grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-2.5 py-3 px-4 border border-[#fa9628] max-[600px]:grid-cols-[1fr_3fr_1fr] max-[600px]:gap-4 justify-items-center">
                <img src={`${url}/images/${item.image}`} alt="announcement-image" className="w-24"/>
                <p>{item.title}</p>
                <p>{item.description.slice(0,100)} ...</p>
                <p>{item.date.split('T')[0]} {item.date.split('T')[1].slice(0,8)}</p>
                <img onClick={() => removeAnnouncement(item._id)} src={assets.removeFood} alt="remove-announcement"  className="cursor-pointer w-6" />
              </div>
            );
          })}
        </div>
    </div>
  )
}

export default ListAnnouncementPage;