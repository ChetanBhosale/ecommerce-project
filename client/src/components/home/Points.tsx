import { Link } from "react-router-dom";
import categories from "../../utility/Categories";

const Points = () => {
  return (
    <div className="w-full flex flex-row 600px:justify-between bg-primary-content py-4 my-2 px-4 text-accent-content overflow-y-auto gap-4">
      {categories.map(
        ({ image, title }: { image: string; title: string }, index: number) => (
          <div
            key={index}
            className="flex flex-col  800px:w-96 justify-center items-center bg-secondary-content text-accent font-bold p-4 rounded-lg shadow-lg "
          >
            <img
              src={image}
              alt={title}
              className="w-20 h-20 mb-2 rounded-full"
            />
            <Link
              to="/"
              className="text-center tracking-wide text-sm hover:underline"
            >
              {title}
            </Link>
          </div>
        )
      )}
    </div>
  );
};

export default Points;
