import { useState, useEffect } from "react";

function DefaultPhonePage() {
  const [phones, setPhones] = useState([]);

  async function getAllPhones() {
    const response = await fetch("http://localhost:8080/api/phones");
    const jsonresponse = await response.json();

    console.log(jsonresponse);
    setPhones(jsonresponse);
  }

  useEffect(() => {
    getAllPhones();
  }, []);

  return (
    <div id="phonesWrapper">
      {phones &&
        phones.map((phone) => (
          <div key={phone.id} id="phone">
            <h3>{phone.name}</h3>
            <p>{phone.brand}</p>
            <img id="pics" src={phone.imgUrl} alt={phone.name} />
            <h2>Price: ${phone.price}</h2>
            <p>
              Screen Size: {phone.screen_size}in. Camera Resolution:{" "}
              {phone.camera_res}
            </p>
            <button id="addToCart" onClick={() => alert("Added to Cart!")}>
              Add to Cart
            </button>
          </div>
        ))}
    </div>
  );
}

export default DefaultPhonePage;
