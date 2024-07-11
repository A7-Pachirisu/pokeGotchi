import { cva, VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { ComponentProps, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const buttonVariant = cva(
  'flex font-semibold justify-center  text-white rounded items-center  hover:brightness-105 active:brightness-110',
  {
    variants: {
      size: {
        sm: '', // 상단바
        md: '', // 상점, sns
        lg: 'px-1.5 py-2', // 로그인
        xl: 'px-6 py-3.5 w-full text-4xl' // 로비,
      },
      intent: {
        yellow: 'bg-custom-yellow text-black',
        red: 'bg-custom-red',
        blue: 'bg-custom-blue',
        grey: 'bg-custom-grey',
        black: 'bg-custom-black',
        green: 'bg-custom-green',
        white: 'bg-custom-white'
      }
    },
    compoundVariants: [],
    defaultVariants: {
      size: 'md',
      intent: 'blue'
    }
  }
);

type ButtonrVariant = VariantProps<typeof buttonVariant>;
export type ButtonProps = ButtonrVariant &
  (ComponentProps<'button'> | ({ href: string } & ComponentProps<typeof Link>));

function Button({ intent, size, children, ...props }: PropsWithChildren<ButtonProps>) {
  if ('href' in props) {
    return (
      <Link className={twMerge(buttonVariant({ intent, size }))} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button className={twMerge(buttonVariant({ intent, size }))} {...props}>
      {children}
    </button>
  );
}

export default Button;
