//import './Login.css';

function Login() {
  return (
    <div className="py-10 px-5 min-h-[60vh]">
      <p className="text-lg mb-5">Login to access the full dashboard</p>
      <form className="flex flex-wrap items-center gap-4">
        <div className="inline-flex items-center gap-2">
          <label htmlFor="email" className="font-normal">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            className="px-2.5 py-1 border border-gray-300 rounded text-base"
          />
        </div>
        <div className="inline-flex items-center gap-2">
          <label htmlFor="password" className="font-normal">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            className="px-2.5 py-1 border border-gray-300 rounded text-base"
          />
        </div>
        <button 
          type="button"
          className="px-4 py-1 bg-white text-black border border-gray-300 rounded cursor-pointer text-base hover:bg-gray-100"
        >
          OK
        </button>
      </form>
    </div>
  )
};

export default Login;
