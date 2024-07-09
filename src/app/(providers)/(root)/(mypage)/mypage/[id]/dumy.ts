// src/data/dummy.ts

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

export interface User {
  id: number;
  name: string;
  profileImage: string;
  hashtags: Hashtags[];
  pokemons: Pokemon[];
}

const hashtags: Hashtags[] = [
  { id: 1, hashtag: '갸라도스의 폭풍속에서' },
  { id: 2, hashtag: '내일은 세계최고의 포켓몬트레이너' },
  { id: 3, hashtag: '포켓몬 마스터를 향해' },
  { id: 4, hashtag: '전설의 포켓몬을 찾아서' },
  { id: 5, hashtag: '진화의 신비' },
];

const users: User[] = [
  {
    id: 1,
    name: 'user1',
    profileImage: '/Pokeball.png',
    hashtags: [ hashtags[2]],
    pokemons: [
      { id: 1, name: '이상해씨', image: '/img1.png', abilities: ['심록', '엽록소'] },
      { id: 2, name: '파이리', image: '/img1.png', abilities: ['맹화', '선파워'] },
      { id: 3, name: '꼬부기', image: '/img1.png', abilities: ['급류', '빗의접시'] },
      { id: 4, name: '피카츄', image: '/img1.png', abilities: ['정전기', '피뢰침'] },
    ],
  },
  {
    id: 2,
    name: 'user2',
    profileImage: '/img1.png',
    hashtags: [hashtags[1], hashtags[2], hashtags[3]],
    pokemons: [
      { id: 5, name: '이브이', image: '/img1.png', abilities: ['적응력', '도주'] },
      { id: 6, name: '뮤', image: '/img1.png', abilities: ['싱크로'] },
      { id: 7, name: '뮤츠', image: '/img1.png', abilities: ['프레셔', '정신력'] },
    ],
  },
  {
    id: 3,
    name: 'user3',
    profileImage: '/bg1.png',
    hashtags: [ hashtags[3], hashtags[4]],
    pokemons: [
      { id: 8, name: '라이츄', image: '/img1.png', abilities: ['정전기', '피뢰침'] },
      { id: 9, name: '리자몽', image: '/img1.png', abilities: ['맹화', '선파워'] },
      { id: 10, name: '프리저', image: '/img1.png', abilities: ['눈보라', '빙판'] },
      { id: 1, name: '이상해씨', image: '/img1.png', abilities: ['심록', '엽록소'] },
    ],
  },
  {
    id: 4,
    name: 'user4',
    profileImage: '/default_ball.png',
    hashtags: [hashtags[0], hashtags[3], hashtags[4]],
    pokemons: [
      { id: 2, name: '파이리', image: '/img1.png', abilities: ['맹화', '선파워'] },
      { id: 3, name: '꼬부기', image: '/img1.png', abilities: ['급류', '빗의접시'] },
      { id: 4, name: '피카츄', image: '/img1.png', abilities: ['정전기', '피뢰침'] },
      { id: 5, name: '이브이', image: '/img1.png', abilities: ['적응력', '도주'] },
      { id: 6, name: '뮤', image: '/img1.png', abilities: ['싱크로'] },
    ],
  },
  {
    id: 5,
    name: 'user5',
    profileImage: '/img1.png',
    hashtags: [hashtags[1], hashtags[2], hashtags[4]],
    pokemons: [
      { id: 7, name: '뮤츠', image: '/img1.png', abilities: ['프레셔', '정신력'] },
      { id: 8, name: '라이츄', image: '/img1.png', abilities: ['정전기', '피뢰침'] },
      { id: 9, name: '리자몽', image: '/img1.png', abilities: ['맹화', '선파워'] },
      { id: 10, name: '프리저', image: '/img1.png', abilities: ['눈보라', '빙판'] },
      { id: 1, name: '이상해씨', image: '/img1.png', abilities: ['심록', '엽록소'] },
    ],
  },
  {
    id: 6,
    name: 'user6',
    profileImage: '/img1.png',
    hashtags: [hashtags[0], hashtags[2], hashtags[4]],
    pokemons: [
      { id: 2, name: '파이리', image: '/img1.png', abilities: ['맹화', '선파워'] },
      { id: 3, name: '꼬부기', image: '/img1.png', abilities: ['급류', '빗의접시'] },
      { id: 4, name: '피카츄', image: '/img1.png', abilities: ['정전기', '피뢰침'] },
      { id: 5, name: '이브이', image: '/img1.png', abilities: ['적응력', '도주'] },
    ],
  },
  {
    id: 7,
    name: 'user7',
    profileImage: '/img1.png',
    hashtags: [hashtags[0], hashtags[1], hashtags[4]],
    pokemons: [
      { id: 6, name: '뮤', image: '/img1.png', abilities: ['싱크로'] },
      { id: 7, name: '뮤츠', image: '/img1.png', abilities: ['프레셔', '정신력'] },
      { id: 8, name: '라이츄', image: '/img1.png', abilities: ['정전기', '피뢰침'] },
      { id: 9, name: '리자몽', image: '/img1.png', abilities: ['맹화', '선파워'] },
      { id: 10, name: '프리저', image: '/img1.png', abilities: ['눈보라', '빙판'] },
    ],
  },
  {
    id: 8,
    name: 'user8',
    profileImage: '/img1.png',
    hashtags: [hashtags[1], hashtags[4]],
    pokemons: [
      { id: 1, name: '이상해씨', image: '/img1.png', abilities: ['심록', '엽록소'] },
      { id: 2, name: '파이리', image: '/img1.png', abilities: ['맹화', '선파워'] },
      { id: 3, name: '꼬부기', image: '/img1.png', abilities: ['급류', '빗의접시'] },
      { id: 4, name: '피카츄', image: '/img1.png', abilities: ['정전기', '피뢰침'] },
      { id: 5, name: '이브이', image: '/img1.png', abilities: ['적응력', '도주'] },
    ],
  },
  {
    id: 9,
    name: 'user9',
    profileImage: '/img1.png',
    hashtags: [hashtags[0], hashtags[3], hashtags[4]],
    pokemons: [
      { id: 6, name: '뮤', image: '/img1.png', abilities: ['싱크로'] },
      { id: 7, name: '뮤츠', image: '/img1.png', abilities: ['프레셔', '정신력'] },
      { id: 8, name: '라이츄', image: '/img1.png', abilities: ['정전기', '피뢰침'] },
      { id: 9, name: '리자몽', image: '/img1.png', abilities: ['맹화', '선파워'] },
      { id: 10, name: '프리저', image: '/img1.png', abilities: ['눈보라', '빙판'] },
      { id: 1, name: '이상해씨', image: '/img1.png', abilities: ['심록', '엽록소'] },
    ],
  },
];

export default users;
