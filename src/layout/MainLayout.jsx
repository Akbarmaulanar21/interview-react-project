const MainLayout = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-[#f9f9f4] relative">
      <img
        src="logo.png"
        alt="logo"
        className="absolute top-10 left-10 hidden md:flex"
      />

      <img
        src="./vector.png"
        alt="vector"
        className="absolute hidden md:flex w-full bottom-32"
      />

      <div className="w-full justify-between items-center absolute hidden md:flex my-auto h-screen z-0">
        <img src="./person-planning.png" alt="left" />
        <img src="./person-facing.png" alt="right" />
      </div>
      <div className="w-full flex items-center justify-center h-screen px-4 xl:px-0 z-30 absolute">
        <div className="max-w-[508px] w-full">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
