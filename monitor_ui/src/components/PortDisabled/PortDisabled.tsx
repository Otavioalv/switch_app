
export const PortDisabled = () => {

    return (
        <div>
            <div className="flex flex-col gap-2">
                <span>
                    FastEthernet
                </span>
                <div className="grid grid-cols-8 gap-3">
                    {Array.from({length: 24}).map((_, i) => (
                        <div key={i} className="border-3 rounded-lg p-3 bg-red-100 border-red-200"/>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                    <span>
                        Gigabit
                    </span>
                    <div  className="grid grid-cols-8 gap-3">
                        {Array.from({length: 5}).map((_, i) => (
                            <div key={i} className="border-3 rounded-lg p-3 bg-red-100 border-red-200"/>
                        ))}
                    </div>
                </div>
        </div>
    )
}

// /* 
// {listPort.map((l, i) => (
//     <div 
//         className={`
//             border-3
//             ${
//                 l.status == "not_connected" 
//                     ? "bg-zinc-200 border-zinc-300" 
//                     : l.status == "disabled" 
//                         ? "bg-red-300 border-red-400" 
//                         : "bg-green-200 border-green-500"
//             } 
//             text-center rounded-lg p-1 w-full h-fit
//             text-xs
//         `}
//         key={i}
//     >
//         {/* {l.port} */}
//         {l.port.match(regexOpc)}
//         {/* {l.status} */}
//         {/* {i} */}
//     </div>
// ))}
// */