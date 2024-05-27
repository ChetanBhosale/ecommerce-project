import { useEffect, useState } from "react";
import "./FilterBar.css";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { filterData } from "../../store/storage/filterSlice";
import { useGetProductsQuery } from "../../store/api/userProduct";

const FilterBar = () => {
  const [category, setCategory] = useState("");
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(1000000);
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [topSold, setTopSold] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();

  function applyFilter() {
    const data = {
      category,
      from,
      to,
      sort,
      order,
      topSold,
    };
    dispatch(filterData(data));
  }

  const { refetch } = useGetProductsQuery({});

  useEffect(() => {
    if (location.pathname.split("/")[2]) {
      const cat: string = location.pathname
        .split("/")[2]
        .replaceAll("%20", " ");
      setCategory(cat);
      dispatch(filterData({ category }));
      refetch();
    }
  }, [location]);

  return (
    <div className="w-72 p-4 border border-y-0 border-l-0  border-r-1 space-y-6">
      <h2 className="text-xl tracking-widest  font-head uppercase font-bold mb-2 ">
        Filters
      </h2>

      <div className="space-y-2">
        <div className="dropdown w-full dropdown-hover">
          <div
            tabIndex={0}
            role="button"
            className="btn bg-primary-content text-primary m-1 w-full text-left"
          >
            {category || "Select Category"}
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full"
          >
            <li>
              <a onClick={() => setCategory("")}>All Categories</a>
            </li>
            <li>
              <a onClick={() => setCategory("Groceries and Gourmet Food")}>
                Groceries and Gourmet Food
              </a>
            </li>
            <li>
              <a onClick={() => setCategory("Electronics and Gadgets")}>
                Electronics and Gadgets
              </a>
            </li>
            <li>
              <a onClick={() => setCategory("Sports and Outdoors")}>
                Sports and Outdoors
              </a>
            </li>
            <li>
              <a onClick={() => setCategory("Books and Media")}>
                Books and Media
              </a>
            </li>
            <li>
              <a onClick={() => setCategory("Home and Living")}>
                Home and Living
              </a>
            </li>
            <li>
              <a onClick={() => setCategory("Toys and Baby Products")}>
                Toys and Baby Products
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block font-para text-lg uppercase font-medium ">
          Price Range
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={from}
            onChange={(e) => setFrom(Number(e.target.value))}
            className="input input-sm input-bordered w-full mb-2"
            placeholder="From"
          />

          <input
            type="number"
            value={to}
            onChange={(e) => setTo(Number(e.target.value))}
            className="input input-sm input-bordered w-full"
            placeholder="To"
          />
        </div>
        <input
          type="range"
          min={0}
          max={1000000}
          value={from}
          onChange={(e) => setFrom(Number(e.target.value))}
          className="range remove range-xs range-primary mb-2"
        />
        <input
          type="range"
          min={0}
          max={1000000}
          value={to}
          onChange={(e) => setTo(Number(e.target.value))}
          className="range  range-xs range-primary mb-2"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-lg font-para font-medium uppercase ">
          Sort By
        </label>

        <div className="dropdown w-full">
          <div tabIndex={0} role="button" className="btn m-1 w-full text-left">
            {sort === "createdAt" ? "Newest First" : "Price"}
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full"
          >
            <li>
              <a onClick={() => setSort("createdAt")}>Newest First</a>
            </li>
            <li>
              <a onClick={() => setSort("price")}>Price</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-lg uppercase font-medium">Order</label>
        <div className="flex items-center space-x-4 mb-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="order"
              value="asc"
              checked={order === "asc"}
              onChange={() => setOrder("asc")}
              className="radio radio-primary mr-2"
            />
            Ascending
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="order"
              value="desc"
              checked={order === "desc"}
              onChange={() => setOrder("desc")}
              className="radio radio-primary mr-2"
            />
            Descending
          </label>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={topSold}
          onChange={(e) => setTopSold(e.target.checked)}
          className="checkbox checkbox-primary"
        />
        <label className="text-sm">Most Sold</label>
      </div>

      <button className="btn btn-primary w-full" onClick={applyFilter}>
        Apply Filters
      </button>
    </div>
  );
};

export default FilterBar;
