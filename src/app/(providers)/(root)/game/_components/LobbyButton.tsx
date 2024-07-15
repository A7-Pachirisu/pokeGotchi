import PokeBall from '@/assets/default ball.png';
import Button, { ButtonProps } from '@/components/Button';
import Image from 'next/image';

type LobbyButton = {
  title: string;
} & ButtonProps;

function LobbyButton({ title, ...props }: LobbyButton) {
  return (
    <Button fit={false} {...props}>
      <Image src={PokeBall} alt="" width={80} height={80} className="mr-10" />
      <span className="grow">{title}</span>
    </Button>
  );
}

export default LobbyButton;
