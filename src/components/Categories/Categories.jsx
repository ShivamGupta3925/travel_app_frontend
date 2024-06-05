import axios from "axios";
import { useEffect, useState } from "react";
import { useCategory } from "../../context";
import "./Categories.css";

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [numberOfCategoriesToShow, setNumberOfCategoriesToShow] = useState(0);
  const { hotelCategory, setHotelCategory } = useCategory();

  const handleShowMoreRightClick = () => {
    setNumberOfCategoriesToShow((prev) => prev + 10);
  };
  const handleShowMoreLeftClick = () => {
    setNumberOfCategoriesToShow((prev) => prev - 10);
  };
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://travel-app-tan-beta.vercel.app/api/category"
        );
        const categoriesToShow = data.slice(
          numberOfCategoriesToShow + 10 > data.length
            ? data.length - 10
            : numberOfCategoriesToShow,
          numberOfCategoriesToShow + 10 > data.length
            ? data.length
            : numberOfCategoriesToShow + 10
        );
        setCategories(categoriesToShow); // Ensure you are setting the correct part of the response
      } catch (err) {
        console.log(err);
      }
    })();
  }, [numberOfCategoriesToShow]);
  const handleCategoryClick = (category) => {
    setHotelCategory(category);
  };
  console.log({ "Hotel Category": hotelCategory });

  return (
    <section className=" categories d-flex align-center gap-large cursor-pointer shadow">
      {numberOfCategoriesToShow >= 10 && (
        <button
          className="button btn-category btn-left cursor-pointer fixed "
          onClick={handleShowMoreLeftClick}
        >
          <span class="material-icons-outlined">chevron_left</span>
        </button>
      )}

      {categories &&
        categories.map(({ _id, category }) => (
          <span
            className={`${category === hotelCategory ? "border-bottom" : ""} `}
            key={_id}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </span>
        ))}
      {numberOfCategoriesToShow - 10 < categories.length && (
        <button
          className=" button btn-category btn-right cursor-pointer fixed "
          onClick={handleShowMoreRightClick}
        >
          <span class="material-icons-outlined">chevron_right</span>
        </button>
      )}
    </section>
  );
};
