import { makeVar } from '@apollo/client';

import { Token } from '@/domain/token';

export const tokenVar = makeVar<Token>(null);
