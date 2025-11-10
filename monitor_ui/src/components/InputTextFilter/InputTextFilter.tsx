import type { InputHTMLAttributes } from "react";
import type React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

export const InputTextFilter: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({...rest}) => {
    return (
        <div className="
            bg-white border border-zinc-400 
            rounded-lg w-full flex
            overflow-hidden 
            focus-within:border-green-500 transition-all
        ">
            <label 
                className="flex items-center p-2"
                htmlFor="input-filter"
            >
                <FaMagnifyingGlass className="text-lg text-zinc-400"/>  
            </label>

            <input 
                className="w-full h-full p-2 shadow-none outline-none transition-all"
                id="input-filter"
                type="text" 
                placeholder="Buscar por nome ou IP..."
                {...rest}
            />
        </div>
    )
}
