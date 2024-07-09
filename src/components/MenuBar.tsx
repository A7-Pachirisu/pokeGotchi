const MenuBar = () => {
  return (
    <div className={`flex h-[70px] w-full items-center justify-around bg-[#39394A]`}>
      <button className="rounded border bg-gray-200 p-2 hover:brightness-90 active:brightness-75">버튼1</button>
      <button className="rounded border bg-gray-200 p-2 hover:brightness-90 active:brightness-75">버튼2</button>
      <button className="rounded border bg-gray-200 p-2 hover:brightness-90 active:brightness-75">버튼3</button>
    </div>
  );
};

export default MenuBar;
