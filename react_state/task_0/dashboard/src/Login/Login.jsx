
function Login() {
  return (
    <div>
      <p className="text-lg mb-5 max-[912px]:text-base">Login to access the full dashboard</p>
      <form className="flex flex-wrap items-center gap-4 max-[912px]:flex-col max-[912px]:items-stretch max-[912px]:gap-3">
        <div className="inline-flex items-center gap-2 max-[912px]:flex-col max-[912px]:items-start max-[912px]:w-full">
          <label htmlFor="email" className="font-normal max-[912px]:mb-1">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            className="px-2.5 py-1 border border-gray-300 rounded text-base max-[912px]:w-full max-[912px]:py-2"
          />
        </div>
        <div className="inline-flex items-center gap-2 max-[912px]:flex-col max-[912px]:items-start max-[912px]:w-full">
          <label htmlFor="password" className="font-normal max-[912px]:mb-1">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            className="px-2.5 py-1 border border-gray-300 rounded text-base max-[912px]:w-full max-[912px]:py-2"
          />
        </div>
        <button 
          type="button"
          className="px-4 py-1 bg-white text-black border border-gray-300 rounded cursor-pointer text-base hover:bg-gray-100 max-[912px]:w-full max-[912px]:py-2 max-[912px]:mt-2"
        >
          OK
        </button>
      </form>
    </div>
  )
};

export default Login;
