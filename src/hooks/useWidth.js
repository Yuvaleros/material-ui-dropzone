import { useTheme } from '@material-ui/core/styles';
import matchMediaQuery from '@material-ui/core/useMediaQuery';

/**
 * Returns xs,sm,md,lg or xl depending on the screenSize
 * @see https://material-ui.com/components/use-media-query/#migrating-from-withwidth
 */
const useWidth = () => {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output, key) => {
      const matches = matchMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
};

export default useWidth;
