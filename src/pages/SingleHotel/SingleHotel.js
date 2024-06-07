import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HotelImages, Navbar, HotelDetails, FinalPrice } from "../../components";
import "./SingleHotel.css";

export const SingleHotel = () => {
  const { id } = useParams();
  const [singleHotel, setSingleHotel] = useState(null); // Initialize with null
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://travel-app-tan-beta.vercel.app/api/hotels/${id}`
        );
        setSingleHotel(data);
        setLoading(false); // Set loading to false once data is fetched
        console.log(data);
      } catch (err) {
        console.log(err);
        setLoading(false); // Set loading to false even if there's an error
      }
    })();
  }, [id]);

  // Use optional chaining to safely access properties
  const name = singleHotel?.name || "Unknown Hotel";
  const country = singleHotel?.country || "Unknown Country";

  return (
    <Fragment>
      <Navbar />
      <main className="single-hotel-page">
        <p className="hotel-name-add">
          {name}, {country}
        </p>
        {loading ? (
          <p>Loading hotel information...</p>
        ) : (
          singleHotel && (
            <>
              <HotelImages singleHotel={singleHotel} />
              <div className="d-flex align-center">
                <HotelDetails singleHotel={singleHotel} />
                <FinalPrice singleHotel={singleHotel}/>
              </div>
            </>
          )
        )}
      </main>
    </Fragment>
  );
};
