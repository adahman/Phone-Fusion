import { useState, useEffect } from "react";

function DefaultPhonePage() {
  const [phones, setPhones] = useState([]);
  const [groupedPhones, setGroupedPhones] = useState({});

  async function getAllPhones() {
    try {
      const response = await fetch("http://localhost:8080/api/phones");
      const jsonResponse = await response.json();
      console.log(jsonResponse);

      const grouped = jsonResponse.reduce((acc, phone) => {
        if (!acc[phone.brand]) acc[phone.brand] = [];
        acc[phone.brand].push(phone);
        return acc;
      }, {});

      setGroupedPhones(grouped);
      setPhones(jsonResponse);
    } catch (error) {
      console.error("Error fetching phones:", error);
    }
  }

  useEffect(() => {
    getAllPhones();
  }, []);

  return (
    <div id="phonesWrapper">
      {Object.keys(groupedPhones).map((brand) => (
        <div key={brand} className="phoneBrandRow">
          <h2 className="brandTitle">{brand}</h2>
          <div className="phoneRow">
            {groupedPhones[brand].map((phone) => (
              <div key={phone.id} className="phoneCard">
                <h3>{phone.name}</h3>
                <p>{phone.brand}</p>
                <img
                  className="phoneImage"
                  src={phone.imgurl}
                  alt={phone.name}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/250x330";
                  }}
                />
                <h2>Price: ${phone.price}</h2>
                <p>
                  Screen Size: {phone.screen_size}in. Camera Resolution:{" "}
                  {phone.camera_res}
                </p>
                <button
                  className="addToCart"
                  onClick={() => alert("Added to Cart!")}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DefaultPhonePage;
