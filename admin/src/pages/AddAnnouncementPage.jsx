import { useState } from "react"
import { assets } from "../assets/assets"
import axios from 'axios';
import { toast } from 'react-toastify';

// eslint-disable-next-line react/prop-types
const AddAnnouncementPage = ({url}) => {
  const [image, setImage] = useState(null);
  // names her must be the same names "name" inside every input
  const [announcementData, setAnnouncementData] = useState({
    title: "",
    description: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAnnouncementData(announcementData => ({...announcementData, [name]: value}))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", announcementData.title);
    formData.append("description", announcementData.description);
    formData.append("image", image);

    try{
      // Api call by axios, post food data to database
      const response = await axios.post(`${url}/announcement/add-announcement`, formData);

      if(response.data && response.data.success){
        // to clean inputs data in browser after post data to database
        setAnnouncementData({
          title: "",
          description: "",
        });
        setImage(null);

        toast.success(response.data.message);  // message came from backend => foodCotroller.js 
      } 
      else {
        console.log('Error in response:', response.data);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('API call error:', error);
    }
  }

  return (
    <div className="w-[70%] mt-10 ml-16 text-gray-800 text-base">
      <form className="flex flex-col gap-5 " onSubmit={onSubmitHandler}>
        <div className="flex flex-col gap-3 ">
          <p>Resim Yükle</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.uploadImage} alt="uploadImage" className="w-44"/>
          </label>
          <input type="file" id="image" hidden required onChange={(e) => setImage(e.target.files[0])}/>
        </div>
        <div className="flex flex-col gap-3 max-w-96 ">
          <p>Duyurun Başlığı</p>
          <input type="text" name="title" placeholder="Duyuru Adı" required value={announcementData.title} onChange={onChangeHandler} className="p-3 border border-gray-400 rounded"/>
        </div>
        <div className="flex flex-col gap-3 max-w-96 ">
          <p>Duyurun Bilgileri</p>
          <textarea rows="8"  name="description" placeholder="Bilgiler..." required value={announcementData.description} onChange={onChangeHandler}  className="p-3 border border-gray-400 rounded"/>
        </div>
        <button type="submit" className="max-w-32 p-3 bg-black text-white cursor-pointer" >Duyuru Ekle</button>
      </form>
    </div>
  )
}

export default AddAnnouncementPage;