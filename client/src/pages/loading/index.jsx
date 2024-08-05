const Loading = () => {
  return (
    <>
      <div
        className="absolute w-full h-full text-white text-4xl bg-cover"
        style={{
          backgroundImage: "url('large-tiles-gradient.webp')",
        }}
      ></div>
      <div
        className="absolute w-full h-full text-white text-4xl blur-md bg-cover"
        style={{
          backgroundImage: "url('large-tiles-gradient.webp')",
        }}
      ></div>
      <div className="absolute flex flex-col justify-center items-center w-full h-full text-white text-4xl">
        <img src="/logo.webp" width={240} height="auto" />
        <div className="mt-8">Loading, Please wait.</div>
        <div className="mt-4 text-sm">Cantt College for Girls</div>
        <div className="text-xs">Wah Cantt.</div>
      </div>
    </>
  );
};

export default Loading;
