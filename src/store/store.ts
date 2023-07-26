import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { Product } from "../models/product";
import { OpeningHours } from "../models/opening-hours";
import { ProductOption } from "../models/product-option";
import { Profile } from "../models/profile";
import { omit } from "lodash";
import { Cart, CartProductOption } from "../models/cart";
import { format } from "date-fns";

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

  cart: Cart | null;
  addToCart: (productOption: CartProductOption[]) => void;
  clearCart: () => void;
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

        cart: null,
        clearCart: () => {
          set((state) => omit(state, ["cart"]), true);
        },
        addToCart: (productOptions: CartProductOption[]) => {
          const cart = get().cart;
          const currentProductOptions = cart?.product_options ?? [];

          let updatedCart: Cart | null = cart ? { ...cart } : null;

          if (!updatedCart) {
            updatedCart = {
              created_at: format(Date.now(), "yyyy-MM-ddTHH:mm") ?? "",
              updated_at: "",
              product_options: [],
            };
          }

          set({
            cart: {
              ...updatedCart,
              product_options: [...currentProductOptions, ...productOptions],
            },
          });
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
