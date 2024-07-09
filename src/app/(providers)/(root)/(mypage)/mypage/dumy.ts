// src/data/pokemon.ts

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  abilities: string[];
}

export interface Hashtags {
  id: number;
  hashtag: string;
}

const pokemonData: Pokemon[] = [
  {
    id: 1,
    name: '이상해씨',
    image: '/img1.png',
    abilities: ['심록', '엽록소']
  },
  {
    id: 2,
    name: '파이리',
    image: '/img1.png',
    abilities: ['맹화', '선파워']
  },
  {
    id: 3,
    name: '꼬부기',
    image: '/img1.png',
    abilities: ['급류', '빗의접시']
  },
  {
    id: 4,
    name: '피카츄',
    image: '/img1.png',
    abilities: ['정전기', '피뢰침']
  },
  {
    id: 5,
    name: '이브이',
    image: '/img1.png',
    abilities: ['적응력', '도주']
  },
  {
    id: 6,
    name: '뮤',
    image: '/img1.png',
    abilities: ['싱크로']
  },
  {
    id: 7,
    name: '뮤츠',
    image: '/img1.png',
    abilities: ['프레셔', '정신력']
  },
  {
    id: 8,
    name: '라이츄',
    image: '/img1.png',
    abilities: ['정전기', '피뢰침']
  },
  {
    id: 9,
    name: '리자몽',
    image: '/img1.png',
    abilities: ['맹화', '선파워']
  }
];

export default pokemonData;

const hashtagData: Hashtags[] = [
  { id: 1, hashtag: '갸라도스의 폭풍속에서' },
  {
    id: 2,
    hashtag: '내일은 세계최고의 포켓몬트레이너'
  }
];
export { hashtagData };
