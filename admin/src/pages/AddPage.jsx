import { useState } from "react"
import { assets } from "../assets/assets"
import axios from 'axios';
import { toast } from 'react-toastify';

// eslint-disable-next-line react/prop-types
const AddPage = ({url}) => {
  const [image, setImage] = useState(null);
  // names her must be the same names "name" inside every input
  const [foodData, setFoodData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Izgara Etler"
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFoodData(foodData => ({...foodData, [name]: value}))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", foodData.name);
    formData.append("description", foodData.description);
    formData.append("price", Number(foodData.price));
    formData.append("category", foodData.category);
    formData.append("image", image);

    try{
      // Api call by axios, post food data to database
      const response = await axios.post(`${url}/food/add-food`, formData);

      if(response.data && response.data.success){
        // to clean inputs data in browser after post data to database
        setFoodData({
          name: "",
          description: "",
          price: "",
          category: "Izgara Etler"
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
        <div className="flex flex-col gap-3 max-w-80 ">
          <p>Yemeğın Adı</p>
          <input type="text" name="name" placeholder="Yemek" required value={foodData.name} onChange={onChangeHandler} className="p-3 border border-gray-400 rounded"/>
        </div>
        <div className="flex flex-col gap-3 max-w-80 ">
          <p>Yemeğın Bilgileri</p>
          <textarea rows="5"  name="description" placeholder="Bilgiler..." required value={foodData.description} onChange={onChangeHandler}  className="p-3 border border-gray-400 rounded"/>
        </div>
        <div className="flex flex-col gap-3 ">
          <div className="flex items-center gap-7" >
            <p>Yemeğın Kategorisi</p>
            <select name="category" value={foodData.category} onChange={onChangeHandler}  className="max-w-40 p-2.5  border border-gray-400 rounded">
              <option value="Izgara Etler" >Izgara Etler</option>
              <option value="Çiğ Ürünler" >Çiğ Ürünler</option>
              <option value="Kahvaltı - Şarküteri" >Kahvaltı - Şarküteri</option>
              <option value="Ekmek Arası" >Ekmek Arası</option>
              <option value="Döner" >Döner</option>
              <option value="Çorba - Yan Lezzetler" >Çorba - Yan Lezzetler</option>
              <option value="Çıtır Lezzetler-Soslar" >Çıtır Lezzetler-Soslar</option>
              <option value="Tatlı - İçecekler" >Tatlı - İçecekler</option>
            </select>
          </div>
          <div className="flex items-center gap-32">
            <p>Fiyat</p>
            <input type="Number" name="price" placeholder="80 TL" required value={foodData.price} onChange={onChangeHandler}  className="max-w-40 p-2.5  border border-gray-400 rounded"/>
          </div>  
        </div>
        <button type="submit" className="max-w-32 p-3 bg-black text-white cursor-pointer" >Yemek Ekle</button>
      </form>
    </div>
  )
}

export default AddPage