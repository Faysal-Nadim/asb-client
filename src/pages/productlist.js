import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { searchProducts, searchProductsByImage } from "../redux/actions";
import { LoadingModal } from "../components/modal/loading";
import { china } from "../assets";

/**
 * @author
 * @function ProductList
 **/

const filters = [
  { value: "default", label: "Default" },
  { value: "sales", label: "Sale" },
  { value: "price_up", label: "Price: Low to High" },
  { value: "price_down", label: "Price: High to Low" },
];

export const ProductList = (props) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const product = useSelector((state) => state.product);

  const params = Object.fromEntries(searchParams.entries());

  const hasSearched = React.useRef(false);

  React.useEffect(() => {
    if (hasSearched.current) return;

    hasSearched.current = true;
    if (params.keyword) {
      dispatch(searchProducts(params));
    }
    if (params.image) {
      dispatch(searchProductsByImage(params));
    }
  }, [dispatch, params]);

  return (
    <div className="py-8 max-w-[1380px] mx-auto px-4 sm:px-4 lg:px-0">
      {product.loading && (
        <>
          <LoadingModal
            text={
              product.imageSearch ? "Searching by Image..." : "Searching..."
            }
          />
          <div className="min-h-[90vh]" />
        </>
      )}
      <div className="flex items-center justify-between">
        <p className="text-md font-semibold">
          {params.keyword
            ? `Search Results for: ${params.keyword}`
            : params.image
              ? `Image Search Results`
              : "All Products"}
        </p>

        <div className="flex items-center space-x-2">
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            value={params.sort || "default"}
            onChange={(e) => {
              const newParams = new URLSearchParams(searchParams);
              newParams.set("sort", e.target.value);
              window.location.search = newParams.toString();
            }}
            className="border border-gray-300 rounded-md px-2 py-1"
          >
            {filters.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4">
        <div>
          {product?.productList?.items?.length === 0 ? (
            <p
              key={product?.productList?.items[0]?.id}
              className="text-center text-gray-500"
            >
              No products found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {product?.productList?.items?.map((product) => (
                <div key={product.id} className="rounded-lg cursor-pointer">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-full lg:h-64 md:h-48 sm:h-48 object-cover mb-2 rounded-lg transform transition-transform duration-200 hover:scale-105"
                  />
                  <h3 className="text-sm font-semibold hover:text-[#2F5651] transition-colors duration-200">
                    {product?.title?.substring(0, 60)}...
                  </h3>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-500">MOQ: {product?.moq}</span>
                    <span className="text-gray-500">
                      {product?.sale_info?.sale_quantity_90days} Sold
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <p className="text-[#BA2525] font-bold text-lg mt-1">
                      ৳{(product.price * 21.35).toFixed(2)}
                    </p>

                    <div className="flex items-center mt-1 bg-[#2F5651] rounded-lg px-2 py-1 w-max">
                      <img src={china} alt="China" className="w-4 h-4" />
                      <span className="text-white text-sm ml-1 font-bold">
                        CN
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
