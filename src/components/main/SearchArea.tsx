const SearchArea = () => {
  return (
    <div className="relative w-full overflow-hidden pb-[max(200px,33%)] sm:pb-[min(300px,33%)] bg-light-main rounded-15">
      {/* search */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 left-0 w-1/2 h-full">
          <div className='absolute -top-100 right-100 md:-top-80 md:right-180 rotate-[-21deg] min-w-120 w-1/2 max-w-180 md:pb-[min(630px,200%)] pb-[max(480px,200%)] bg-[url("/src/assets/wine1.png")] bg-contain bg-no-repeat bg-center z-1'></div>
          <div className='absolute -top-150 -right-70 md:-top-80 md:-right-50 min-w-220 w-[90%] md:pb-[min(460px,200%)] pb-[max(480px,200%)] bg-[url("/src/assets/wine2.png")] bg-contain bg-no-repeat bg-center'></div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <div className='absolute -top-120 -left-0 md:-top-90 md:-left-90 w-[120%] min-w-285 md:pb-[min(420px,600%)] pb-[max(400px,150%)] bg-[url("/src/assets/wine3.png")] bg-contain bg-no-repeat bg-center'></div>
        </div>
      </div>
    </div>
  );
};

export default SearchArea;
