import { FC } from "react";
import { IoMdSearch } from "react-icons/io";
type Props = object;

const SearchBar: FC<Props> = () => {
  return (
    <label
      className={`input input-bordered outline-0 input-md hidden 600px:flex items-center gap-2 h-10 `}
    >
      <IoMdSearch size={20} />
      <input
        type="text"
        className="grow w-56 1000px:w-96  "
        placeholder="Search..."
      />
    </label>
  );
};

export default SearchBar;
