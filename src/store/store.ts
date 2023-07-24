import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { Product } from "../models/product";
import { OpeningHours } from "../models/opening-hours";
import { ProductOption } from "../models/product-option";
import { Profile } from "../models/profile";
import { OrderSession } from "../models/order-session";
import { OrderSessionItem } from "../models/order-session-item";
import { omit } from "lodash";

interface AppState {
  products: Product[];
  setProducts: (products: Product[]) => void;
  updateProduct: (product: Product) => void;

  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  clearSelectedProduct: () => void;

  openingHours: OpeningHours[];
  setOpeningHours: (openingHours: OpeningHours[]) => void;

  productOptions: ProductOption[];
  setProductOptions: (productOptions: ProductOption[]) => void;
  updateProductOptions: (updatedProductOption: ProductOption) => void;

  profile: Profile | null;
  setProfile: (profile: Profile) => void;

  orderSession: OrderSession | null;
  createOrderSession: (orderSession: OrderSession) => void;
  addToOrderSession: (orderSessionItem: OrderSessionItem) => void;
  clearOrderSession: () => void;
}

const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // Profile
        profile: null,
        setProfile: (profile: Profile) => {
          set(() => ({ profile }));
        },

        // Products
        products: [],
        setProducts: (products: Product[]) => {
          set(() => ({ products }));
        },
        updateProduct: (updatedProduct: Product) => {
          const currentProducts = get().products;
          const updatedProducts = currentProducts.map((product) => {
            if (product.id === updatedProduct.id) {
              return updatedProduct;
            }
            return product;
          });

          set(() => ({
            products: updatedProducts,
          }));
        },

        // Selected product
        selectedProduct: null,
        setSelectedProduct: (product: Product | null) => {
          set({ selectedProduct: product });
        },
        clearSelectedProduct: () => {
          set(
            (state) => omit(state, ["selectedProduct", "productOptions"]),
            true
          );
        },

        // Opening Hours
        openingHours: [],
        setOpeningHours: (openingHours: OpeningHours[]) => {
          set(() => ({ openingHours }));
        },

        //Product Options
        productOptions: [],
        setProductOptions: (productOptions: ProductOption[]) =>
          set(() => ({ productOptions })),
        updateProductOptions: (updatedProductOption: ProductOption) => {
          const currentProductOptions = get().productOptions;
          const updatedProductOptions = currentProductOptions.map(
            (productOption) => {
              if (productOption.id === updatedProductOption.id) {
                return updatedProductOption;
              }
              return productOption;
            }
          );

          set(() => ({ productOptions: updatedProductOptions }));
        },

        // Order session
        orderSession: null,
        createOrderSession: (orderSession: OrderSession) => {
          set({ orderSession });
        },
        addToOrderSession: () => {
          console.log("items");
        },
        clearOrderSession: () => {
          set({ orderSession: null });
        },
      }),
      {
        name: "app-store",
        storage: createJSONStorage(() => sessionStorage),
        version: 1,
      }
    )
  )
);

export default useAppStore;
