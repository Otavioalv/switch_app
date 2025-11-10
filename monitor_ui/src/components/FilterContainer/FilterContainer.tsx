import { useMemo, useState, type ChangeEvent } from "react"
import { InputTextFilter } from "../InputTextFilter/InputTextFilter"
import { FilterOptions } from "../FilterOptions/FilterOptions";
import { LuFilter } from "react-icons/lu";
import type { infoStatusType } from "../../types/switchType";

export type FilterContainerProps = {
    totalFilter: number;
    originalList: infoStatusType[]; // alterar futuramente
}

export const FilterContainer = ({totalFilter=0, originalList}: FilterContainerProps) => {
    const [statusOpt, setStatusOpt] = useState<string>("Todos Status");
    const [tipoOpt, setTipoOpt] = useState<string>("Todos os Tipos");
    

    // const [statusFilter, setStatusFilter] = useState<string>("Todos");
    // const [colorFilter, setColorFilter] = useState<string>("Todos");
    const [textFilter, setTextFilter] = useState<string>("");


    
    const statusList = useMemo(() => {
        return [...new Set(originalList.map(item => item.status))];
    }, [originalList]);

    // const colorList  = useMemo(() => {
    //     return [...new Set(originalList.map(item => item.))];
    // }, [originalList]);

    // const statusList: string[] = ["sucess", "error"];



    const handleSetTextFilter = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault(); // adicionei
        
        setTextFilter(e.target.value);
    } 

    // const handleResetFilter = () => {
    //     setStatusFilter("Todos");
    //     setColorFilter("Todos");
    //     setTextFilter("");

    //     onFilterChange(originalList); 
    // }

    // // O useEffect agora é responsável apenas por aplicar os filtros e notificar o pai.
    // useEffect(() => {
    //     const filteredList = originalList.filter((item) => {
    //         const statusMatch = statusFilter === "Todos" || item.status === statusFilter;
    //         const colorMatch = colorFilter === "Todos" || item.toner_name === colorFilter;
            
    //         const textMatch = !textFilter || (
    //             String(item.model || "")?.trim().toUpperCase().includes(textFilter.trim().toUpperCase()) ||
    //             String(item.ip || "")?.trim().includes(textFilter.trim().toUpperCase()) ||
    //             String(item.sector || "")?.trim().toUpperCase().includes(textFilter.trim().toUpperCase())
    //         );

    //         return statusMatch && colorMatch && textMatch;
    //     });

    //     // Chama a função do pai com a lista já filtrada
    //     onFilterChange(filteredList);
        
    // }, [statusFilter, colorFilter, textFilter, originalList, onFilterChange]);




    return (
        // bg-zinc-50 border border-zinc-200 w-full rounded-2xl p-6 flex items-center gap-4
        <section className="bg-zinc-50 border border-zinc-200  p-6 flex gap-4 flex-col rounded-2xl">
            <div className="">
                <InputTextFilter onChange={handleSetTextFilter} value={textFilter}/>
            </div>

            {/* Sesão de filtros */}
            <div className="flex gap-5 text-zinc-500">
                <div className="flex justify-center items-center gap-2">
                    <LuFilter/>
                    <span>Filtros:</span>
                </div>
                <FilterOptions 
                    defaultValue="Todos Status" 
                    listOptions={statusList}
                    optionSelected={statusOpt}
                    setOptionSelected={setStatusOpt}
                />

                <FilterOptions 
                    defaultValue="Todos Tipos" 
                    listOptions={["lista", "ts3daf", "tsd4af", "ts1daf", "tsda45f"]}
                    optionSelected={tipoOpt}
                    setOptionSelected={setTipoOpt}
                />
            </div>

            {/* Numeros */}
            <div className="text-zinc-500">
                <p>Exibindo <strong>{totalFilter}</strong> de <strong>20</strong> switches</p>
            </div>
        </section>
    )
}