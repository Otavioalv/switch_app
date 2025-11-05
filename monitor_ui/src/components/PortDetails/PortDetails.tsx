import type { statusPortType } from "../../consts/mokMonitor"


export type PortDetailsProps = {
    listPort: statusPortType[];
    title: string;
    regexOpc: RegExp;
}

export const PortDetails = ({listPort, title, regexOpc} : PortDetailsProps) => {
    // console.log(listPort);
    return (
        <>
            {listPort.length ? (
                <div className="flex flex-col gap-2">
                    <span>
                        {title}
                    </span>
                    <div className="grid grid-cols-8 gap-3">
                        {listPort.map((l, i) => (
                            <div 
                                className={`
                                    border-3
                                    ${
                                        l.status == "not_connected" 
                                            ? "bg-zinc-200 border-zinc-300" 
                                            : l.status == "disabled" 
                                                ? "bg-red-300 border-red-400" 
                                                : "bg-green-200 border-green-500"
                                    } 
                                    text-center rounded-lg p-1 w-full h-fit
                                    text-xs
                                `}
                                key={i}
                            >
                                {/* {l.port} */}
                                {l.port.match(regexOpc)}
                                {/* {l.status} */}
                                {/* {i} */}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (null)}
        </>
    )
}