const Loading = () => {
  return (
    <>
      <div
        className="absolute w-full h-full text-white text-4xl bg-large-tiles bg-cover"
        style={{
          backgroundImage: "url('large-tiles-gradient.png')",
        }}
      ></div>
      <div
        className="absolute w-full h-full text-white text-4xl bg-large-tiles blur-md bg-cover"
        style={{
          backgroundImage: "url('large-tiles-gradient.png')",
        }}
      ></div>
      <div className="absolute flex flex-col justify-center items-center w-full h-full text-white text-4xl">
        <img src="/logo.png" width={240} height="auto" />
        <div className="mt-8">Loading, Please wait.</div>
        <div className="mt-4 text-sm">Cantt College for Girls</div>
        <div className="text-xs">Wah Cantt.</div>
      </div>
    </>
  );
};

export default Loading;
