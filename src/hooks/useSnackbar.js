import { useCallback, useState } from 'react';

/**
 * Holds state required to utilize the snackbar and provides handlers to send messages via the snackbar
 */
const useSnackbar = (onAlert) => {
  const [state, setState] = useState({
    open: false,
    message: '',
    variant: 'success',
  });

  const sendMessage = useCallback(
    (message, variant) => {
      setState({
        open: true,
        message,
        variant,
      });

      if (onAlert) {
        onAlert(message, variant);
      }
    },
    [onAlert],
  );

  const handleCloseSnackbar = useCallback(() => {
    setState((prev) => ({ ...prev, open: false }));
  }, []);

  return {
    handleCloseSnackbar,
    sendMessage,
    snackbarMessage: state.message,
    snackbarVariant: state.variant,
    snackbarOpen: state.open,
  };
};

export default useSnackbar;
