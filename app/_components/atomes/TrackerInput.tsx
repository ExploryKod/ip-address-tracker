import { ArrowRight } from "lucide-react";
import { useState, type SyntheticEvent } from "react";

type TrackerInputProps = {
  onSearchIp: (ip: string) => Promise<void>;
  isSearching: boolean;
  searchError: string | null;
};

export const TrackerInput = ({
  onSearchIp,
  isSearching,
  searchError,
}: TrackerInputProps) => {
    const [value, setValue] = useState("");
    const [clientError, setClientError] = useState<string | null>(null);

    async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
      e.preventDefault();
      const ip = value.trim();
      if (!ip) {
        setClientError("Please enter an IP address.");
        return;
      }

      setClientError(null);
      await onSearchIp(ip);
    }

    return (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm min-w-[200px] relative flex flex-col justify-center items-center"
          noValidate
        >
        <label htmlFor="tracker-ip" className="block w-0 h-0 opacity-0">
          IP Address input
        </label>

        <div className="relative my-2 mx-auto w-full">
          <input
            id="tracker-ip"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoComplete="off"
            disabled={isSearching}
            className="w-full bg-white placeholder:text-gray-500 
          text-gray-700 text-sm border border-slate-200 rounded-md pr-10 pl-3 py-2 
          transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 
          shadow-sm focus:shadow disabled:opacity-60"
            placeholder="Search for any IP address"
          />

          <button className="absolute right-0 top-0 bottom-0 rounded-r-md p-1.5 border border-transparent text-center text-sm 
          text-white bg-black transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none 
          active:bg-slate-700 hover:bg-gray-300 active:shadow-none 
          disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" 
          type="submit"
          disabled={isSearching}>

            <ArrowRight className="w-4 h-full text-white cursor-pointer" />

          </button>
        </div>
        {(clientError || searchError) && (
          <p role="alert" className="text-xs text-red-200">
            {clientError ?? searchError}
          </p>
        )}
        </form>
    );
}