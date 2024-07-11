import LobbyButton from './_components/LobbyButton';

const GameLobbyPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center px-5 text-center">
      <div className="bg-blue bg-blue h-32">유저정보</div>
      <div className="flex w-full flex-col items-center gap-y-10">
        <LobbyButton intent="yellow" size="xl" href="/game/ball" title="포켓볼 피하기" />
        <LobbyButton intent="blue" size="xl" href="/game/quiz" title="퀴즈 게임" />
        <LobbyButton intent="red" size="xl" href="/game/fruit" title="포켓몬 수박 게임" />
      </div>
    </div>
  );
};

export default GameLobbyPage;
