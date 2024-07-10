import { toast } from 'react-toastify';

export const notify = (message: string) =>
  toast(message, {
    className: 'shadow-md rounded-md p-4',
    bodyClassName: 'text-lg text-center font-dunggeunmo text-black',
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: true,
    style: { marginTop: '25vh', transform: 'translateY(-30%)' }
  });
