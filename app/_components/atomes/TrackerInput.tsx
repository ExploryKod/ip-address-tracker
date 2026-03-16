import { ArrowRight } from "lucide-react";

export const TrackerInput = () => {
    return (
        <div className="w-full max-w-sm min-w-[200px] relative flex justify-center items-center">
        <label className="block w-0 h-0 opacity-0">
          IP Address
        </label>
       
        <div className="relative my-2 mx-auto">

          <input type="email" className="w-full bg-white placeholder:text-gray-500 
          text-gray-700 text-sm border border-slate-200 rounded-md pr-10 pl-3 py-2 
          transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 
          shadow-sm focus:shadow" placeholder="Enter your text" />

          <button className="absolute right-0 top-0 bottom-0 rounded-r-md p-1.5 border border-transparent text-center text-sm 
          text-white bg-black transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none 
          active:bg-slate-700 hover:bg-gray-300 active:shadow-none 
          disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" 
          type="button">

            <ArrowRight className="w-4 h-full text-white cursor-pointer" />

          </button>
        </div>
      </div>
    )
}