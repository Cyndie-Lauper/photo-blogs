import { cache } from 'react';
import { auth } from '@/auth';
import { screenForPPR } from '@/utility/prr';


export const authCachedSafe = cache(() => auth()
  .catch(e => screenForPPR(e, null, 'auth')));
