import { InMemoryCache, Reference } from '@apollo/client';
import _ from 'lodash';
import { OrderStatus } from '@/domain/order';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        managedStore: {
          keyArgs: false,
          merge: (
            existing: Reference[] = [],
            incoming: Reference[],
            { readField }
          ) =>
            _(existing)
              .unionBy(incoming, '__ref')
              .orderBy((store) => readField('createdAt', store), ['desc'])
              .value(),
        },
        productsRanking: {
          keyArgs: false,
          merge: (
            existing: Reference[] = [],
            incoming: Reference[],
            { readField }
          ) =>
            _(existing)
              .unionBy(incoming, '__ref')
              .orderBy((product) => readField('score', product), ['desc'])
              .value(),
        },
        ordersWithMember: {
          keyArgs: false,
          merge: (
            existing: Reference[] = [],
            incoming: Reference[],
            { readField }
          ) =>
            _(existing)
              .unionBy(incoming, '__ref')
              .filter(
                (order) => readField('status', order) === OrderStatus.SUCCESS
              )
              .orderBy((order) => readField('createdAt', order), ['desc'])
              .value(),
        },
      },
    },
  },
});

export default cache;
