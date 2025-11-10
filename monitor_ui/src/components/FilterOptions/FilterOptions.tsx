import { useMemo, useState, type Dispatch, type SetStateAction } from "react"
import { IoIosArrowDown } from "react-icons/io";

export type filterOptionsProps = {
    listOptions: string[], 
    defaultValue: string,
    
    optionSelected: string,
    setOptionSelected: Dispatch<SetStateAction<string>>
}

export const FilterOptions = ({listOptions, defaultValue, optionSelected, setOptionSelected}: filterOptionsProps) => {
    // const [optionSelected, setOptionSelected] = useState<string>(defaultValue);
    const [isClickedOpt, setIsClickedOpt] = useState<boolean>(false);

    const fullOptions = useMemo(() => {
        return [defaultValue, ...listOptions]
    }, [defaultValue, listOptions]);

    // Função que define se a caixa de opções aparece ou não
    const handleClickedOpt = () => {
        setIsClickedOpt(!isClickedOpt)
    }

    // Função que define o valor que sera mostrado (opção selecionada)
    const handleSetOptionSelected = (opt: string) => {
        setOptionSelected(opt);
        setIsClickedOpt(false);
    }

    return (
        <div
            className="
                2xl:w-56
                w-2/4
                transition-all
                relative
                inline-block
                text-slate-900
            "
            
        >
            <button  
                onClick={handleClickedOpt}
                className="
                    w-full
                    text-left
                    flex justify-between items-center
                    bg-zinc-100 hover:bg-green-200
                    rounded-md
                    border border-zinc-200
                    cursor-pointer
                    py-1 px-4
                "
            >
                {optionSelected}

                <IoIosArrowDown 
                    className={`
                        text-md
                        text-zinc-500
                        transition-all
                        ${isClickedOpt ? "rotate-180" : "rotate-0"}
                    `}
                />
            </button>

            <ul 
                className={`
                    -bg-green-300
                    mt-1
                    overflow-hidden
                    absolute
                    w-full
                    transition-all
                    z-10
                    rounded-md
                    bg-zinc-100
                    border border-zinc-200

                    ${isClickedOpt 
                        ? "-h-fit block"
                        : "-h-0 hidden"
                    }
                `}
            >
                {fullOptions.map((opt, i) => {
                    return (opt != optionSelected && (
                        <li 
                            className="
                                hover:bg-green-200 
                                py-1 px-4
                                cursor-pointer
                            "
                            key={i}
                            onClick={() => handleSetOptionSelected(opt)}
                        >
                            {opt}
                        </li>
                    ))
                })}
            </ul>
        </div>
    )
}
