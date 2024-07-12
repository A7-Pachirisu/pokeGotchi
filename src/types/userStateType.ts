export type userState = {
  user: any;
  coins: number | null;
  nickname: string | null;
  ownedPokemons: number[];
  fetchUserAndCoinInfo: () => void;
  deductCoins: (amount: number) => Promise<boolean>;
  fetchOwnedPokemons: () => void;
};
