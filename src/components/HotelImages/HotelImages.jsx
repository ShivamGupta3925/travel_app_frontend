import "./HotelImages.css";

export const HotelImages = ({ singleHotel }) => {
  console.log(singleHotel);

  // Use optional chaining and default values
  const { image, imageArr } = singleHotel || {};

  return (
    <div className="hotel-image-container d-flex gap-small">
      <div className="primary-image-container">
        <img className="primary-img" src={image || 'default-image.jpg'} alt="hotel" />
      </div>
      <div className="d-flex wrap gap-small">
        {imageArr && imageArr.length > 0 ? (
          imageArr.map((img, index) => (
            <img
              key={index}
              className="hotel-img"
              src={img}
              alt={`hotel ${index + 1}`}
            />
          ))
        ) : (
          <p>No additional images available</p>
        )}
      </div>
    </div>
  );
};
