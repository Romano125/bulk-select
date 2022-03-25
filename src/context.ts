import { createContext } from 'react';

import { BulkSelectContext } from './types';

export default createContext<BulkSelectContext>([{}, () => ({})]);
