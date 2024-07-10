import { nanoid } from 'nanoid';
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

let activeToastId: string | null = 'null';

export const performToast = ({ msg, type }: performToastProps) => {
  if (activeToastId && toast.isActive(activeToastId)) return;
  activeToastId = nanoid();

  const options: ToastOptions = {
    ...defaultOption,
    toastId: activeToastId
  };

  switch (type) {
    case 'error':
      return toast.error(msg, options);
    case 'success':
      return toast.success(msg, options);
    case 'warning':
      return toast.warn(msg, options);
    default:
      return;
  }
};
