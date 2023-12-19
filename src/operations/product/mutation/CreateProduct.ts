import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { ReactNativeFile } from 'apollo-upload-client';

import { BreadType, Product } from '@/domain/product';
import { PRODUCT_FRAGMENT_GQL } from '@/operations/product/fragment';
import {
  Data as GetProductsData,
  GET_PRODUCTS_GQL,
  Variable as GetProductsVariable,
} from '@/operations/product/query/GetProducts';

export type Data = Record<'createProduct', Product>;

export interface Variable {
  storeId: string;
  image?: ReactNativeFile;
  name: string;
  breadType: BreadType;
  description: ReactNativeFile[];
  price: number;
  quantity: number | null;
}

export const CREATE_PRODUCT_GQL = gql`
  ${PRODUCT_FRAGMENT_GQL}
  mutation createProduct(
    $storeId: ID!
    $image: Upload
    $name: String!
    $breadType: BreadType!
    $description: [Upload!]!
    $price: Int!
    $quantity: Int
  ) {
    createProduct(
      request: {
        storeId: $storeId
        image: $image
        name: $name
        breadType: $breadType
        description: $description
        price: $price
        quantity: $quantity
      }
    ) {
      ...ProductFragment
    }
  }
`;

export const CREATE_PRODUCT = (options?: MutationHookOptions<Data, Variable>) =>
  useMutation<Data, Variable>(CREATE_PRODUCT_GQL, {
    update: (cache, { data }) => {
      if (!data) return;

      cache.updateQuery<GetProductsData, GetProductsVariable>(
        {
          query: GET_PRODUCTS_GQL,
          variables: {
            storeId: data.createProduct.store.id,
          },
        },
        (prev) => ({
          products: [data.createProduct, ...(prev?.products ?? [])],
        })
      );
    },
    ...options,
  });
