import { cva, VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { ComponentProps, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const buttonVariant = cva(
  'flex font-semibold justify-center text-white rounded items-center text-xl hover:brightness-105 active:brightness-110',
  {
    variants: {
      size: {
        sm: 'px-2.5 py-1.5', // 상단바
        md: 'px-3.5 py-2.5', // 상점, sns
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
        white: 'bg-custom-white',
        darkGrey: 'bg-bar-color'
      },
      fit: {
        true: 'w-fit',
        false: 'w-full'
      }
    },
    compoundVariants: [
      { intent: 'white', size: 'md', className: 'text-black bg-white border border-gray-400 shadow-md' }
    ],
    defaultVariants: {
      size: 'md',
      intent: 'blue',
      fit: true
    }
  }
);

type ButtonrVariant = VariantProps<typeof buttonVariant>;
export type ButtonProps = ButtonrVariant &
  (ComponentProps<'button'> | ({ href: string } & ComponentProps<typeof Link>));

function Button({ intent, size, fit, children, className, ...props }: PropsWithChildren<ButtonProps>) {
  const mergedClassName = twMerge(buttonVariant({ intent, size, fit }), className);
  if ('href' in props) {
    return (
      <Link className={mergedClassName} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button className={mergedClassName} {...props}>
      {children}
    </button>
  );
}

export default Button;
