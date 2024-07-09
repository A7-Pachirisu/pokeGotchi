"use client";


import axios from 'axios';

export default function Home() {
  const fetchPokemonData = async () => {
    try {
      const response = await axios.get("/api");
      const data = response.data;
    } catch (error) {
      console.error("Response Error:", error);
    }

  }


  return (
    <>
      ㅇㅇㅇ
    </>
  );
}
