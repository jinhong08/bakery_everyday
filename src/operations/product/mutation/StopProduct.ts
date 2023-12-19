import { gql, MutationHookOptions, useMutation } from '@apollo/client';

import { Product } from '@/domain/product';
import { PRODUCT_FRAGMENT_GQL } from '@/operations/product/fragment';

export type Data = Record<'stopProduct', Product>;

export interface Variable {
  productId: string;
}

export const STOP_PRODUCT_GQL = gql`
  ${PRODUCT_FRAGMENT_GQL}
  mutation stopProduct($productId: ID!) {
    stopProduct(productId: $productId) {
      ...ProductFragment
    }
  }
`;

export const STOP_PRODUCT = (options?: MutationHookOptions<Data, Variable>) =>
  useMutation<Data, Variable>(STOP_PRODUCT_GQL, {
    update: (cache, { data }) => {
      if (!data) return;

      cache.modify({
        id: `ProductResponse:${data.stopProduct.id}`,
        fields: {
          status: () => false,
        },
      });
    },
    ...options,
  });
