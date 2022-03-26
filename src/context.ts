import { createContext } from 'react';

import { BulkSelectContext } from 'src/types';

export default createContext<BulkSelectContext>([{}, () => ({})]);
