const Loading = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/30 z-80">
      <div className="flex flex-col items-center">
        <img
          src="/rsts.jpg"
          alt="loadingImage"
          className="w-[60px] h-[60px] mb-4 rounded-md shadow-md animate-pulse"
        />
        <p className="text-3xl font-semibold text-white">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
