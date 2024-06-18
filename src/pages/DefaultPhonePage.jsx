
import {useState, useEffect} from "react";




function DefaultPhonePage() {

  const[phones, setPhones] = useState([]);

  async function getAllPhones() {
    const response = await fetch("http://localhost:8080/api/phones");
    const jsonresponse = await response.json();
    console.log(jsonresponse);
    setPhones(jsonresponse);
  }

  useEffect(() => {
    getAllPhones();
  }, [])


  return(
    <div id="phoneWrapper">
    <div></div>
    {phones && (
      phones.map(phones=>
        <div key={phones} id="phones">
        <h3 key={phones} >{phones.name}</h3>
        <p key={phones} >{phones.brand}</p>
        <img id="pics" key={phones}  src={phones.imgUrL} alt={phones.name} />
        <h2 key={phones} >Price:{phones.price}</h2>
        <p key={phones} >Screen Size:{phones.screen_size} Camera Resolution:{phones.camera_res}</p>
        <button key={phones} id="addToCart" onClick={()=>alert("Added to Cart!")}>Add to Cart</button>
        
        
        </div>
      )
  )}
  </div>
  )
}

export default  DefaultPhonePage;
