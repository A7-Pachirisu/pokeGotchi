import { toast } from 'react-toastify';

export const notify = (message: string) =>
  toast(message, {
    className: 'bg-white shadow-md rounded-md p-4 ',
    bodyClassName: 'text-md text-center font-medium font-dunggeunmo',
    position: 'bottom-center',
    autoClose: 2000,
    hideProgressBar: true
  });
