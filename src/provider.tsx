import React, { useState, FC } from 'react';

import BulkSelectContext from 'src/context';

interface IBulkSelectProvider {
    children: Element;
}

const BulkSelectProvider: FC<IBulkSelectProvider> = ({ children }: IBulkSelectProvider) => {
    const [state, setState] = useState({});
    return (
        <BulkSelectContext.Provider value={[state, setState]}>
            {children}
        </BulkSelectContext.Provider>
    );
};

export default { BulkSelectProvider };
