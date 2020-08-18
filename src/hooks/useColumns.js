import { useEffect, useState } from 'react';

import useWidth from './useWidth';

/**
 * Calculates the number of columns to use in the preview based on a function passed in
 * numberOfColumns is a state variable which will update every time the width of the
 * screen changes
 */
const useColumns = (getCols, filesLimit, numberOfFileObjects) => {
  const [numberOfColumns, setCols] = useState(1);
  const width = useWidth();

  useEffect(() => {
    const cols = getCols(width, filesLimit, numberOfFileObjects);
    setCols(cols);
  }, [filesLimit, getCols, numberOfFileObjects, width]);

  return numberOfColumns;
};

export default useColumns;
