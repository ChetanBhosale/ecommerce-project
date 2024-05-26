import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ProductQueryParams {
  page?: number;
  size?: number;
  sort?: string;
  order?: "asc" | "desc";
  search?: string;
  category?: string;
  state?: string;
  from?: number;
  to?: number;
  topSold?: boolean;
}

export interface ProductView {
  data: {
    id: string;
    name: string;
    description: string;
    category: string;
    state: string;
    images: any;
    price: number;
    less: number;
    totalPurchase: number;
    createdAt: string;
    updatedAt: string;
    size: string[];
    color: string[];
  };
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  state: string;
  images: string[];
  price: number;
  less: number;
  totalPurchase: number;
  createdAt: string;
  updatedAt: string;
  size: string[];
  color: string[];
}

export const userProductApi = createApi({
  reducerPath: "userProductApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1/" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params: ProductQueryParams) => {
        const queryParams = new URLSearchParams();

        if (params.page) queryParams.append("page", params.page.toString());
        if (params.size) queryParams.append("size", params.size.toString());
        if (params.sort) queryParams.append("sort", params.sort);
        if (params.order) queryParams.append("order", params.order);
        if (params.search) queryParams.append("search", params.search);
        if (params.category) queryParams.append("category", params.category);
        if (params.state) queryParams.append("state", params.state);
        if (params.from) queryParams.append("from", params.from.toString());
        if (params.to) queryParams.append("to", params.to.toString());
        if (params.topSold)
          queryParams.append("topSold", params.topSold.toString());

        return {
          url: `products-view?${queryParams.toString()}`,
        };
      },
    }),
  }),
});

export const { useGetProductsQuery } = userProductApi;
