import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface performToastProps {
  msg: string;
  type: 'error' | 'success' | 'warning';
}

const defaultOption: ToastOptions = {
  position: 'top-right',
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
  theme: 'light'
};

export const performToast = ({ msg, type }: performToastProps) => {
  switch (type) {
    case 'error':
      return toast.error(msg, defaultOption);
    case 'success':
      return toast.success(msg, defaultOption);
    case 'warning':
      return toast.warn(msg, defaultOption);
    default:
      return;
  }
};
