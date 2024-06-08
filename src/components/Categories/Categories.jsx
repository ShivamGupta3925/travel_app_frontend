import axios from "axios";
import { useEffect, useState } from "react";
import { useCategory, useFilter } from "../../context";
import "./Categories.css";

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [numberOfCategoriesToShow, setNumberOfCategoriesToShow] = useState(0);
  const { hotelCategory, setHotelCategory } = useCategory();
  const { filterDispatch } = useFilter();

  const handleFilterClick = () => {
    filterDispatch({
      type: "SHOW_FILTER_MODAL",
    });
  };

  const handleShowMoreRightClick = () => {
    setNumberOfCategoriesToShow((prev) => Math.min(prev + 10, categories.length - 10));
  };

  const handleShowMoreLeftClick = () => {
    setNumberOfCategoriesToShow((prev) => Math.max(prev - 10, 0));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "https://travel-app-tan-beta.vercel.app/api/category"
        );
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
  }, []);

  const visibleCategories = categories.slice(
    numberOfCategoriesToShow,
    numberOfCategoriesToShow + 10
  );

  const handleCategoryClick = (category) => {
    setHotelCategory(category);
  };

  return (
    <section className="categories d-flex align-center gap-large cursor-pointer shadow">
      <button
        className="button btn-category btn-left"
        onClick={handleShowMoreLeftClick}
        disabled={numberOfCategoriesToShow <= 0}
      >
        <span className="material-icons-outlined">chevron_left</span>
      </button>

      <div className="categories-list d-flex">
        {visibleCategories.map(({ _id, category }) => (
          <span
            className={`${category === hotelCategory ? "border-bottom" : ""}`}
            key={_id}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </span>
        ))}
      </div>

      <button
        className="button btn-category btn-right"
        onClick={handleShowMoreRightClick}
        disabled={numberOfCategoriesToShow + 10 >= categories.length}
      >
        <span className="material-icons-outlined">chevron_right</span>
      </button>

      <button
        className="button btn-filter d-flex align-center gap-small cursor-pointer"
        onClick={handleFilterClick}
      >
        <span className="material-icons-outlined">filter_alt</span>
        <span>Filter</span>
      </button>
    </section>
  );
};
