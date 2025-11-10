import { useEffect,  useState } from "react";
import type { infoStatusType, statusPortType } from "../../types/switchType"
// import { lightTheme } from "../../theme/themes"
import { PortDetails } from "../PortDetails/PortDetails";
import { InfoStatusSw } from "../InfoStatusSw/InfoStatusSw";

import { FaNetworkWired, FaRegCheckCircle, FaRegTimesCircle  } from "react-icons/fa";
import { LuCircleMinus } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { PortDisabled } from "../PortDisabled/PortDisabled";


export type InfoSwitchCardProps = {
    infoSwitch: infoStatusType
}

export const InfoSwitchCard = ({infoSwitch}: InfoSwitchCardProps) => {
    const [fastEthernetList, setFastEthernet] = useState<statusPortType[]>([]);
    const [gigabitList, setGigabit] = useState<statusPortType[]>([]);
    const [vlanList, setVlanList] = useState<statusPortType[]>([]);
    const [nullList, setNullList] = useState<statusPortType[]>([]);

    const [countConnect, setCountConnect] = useState<number>(0);
    const [countDisconnected, setCountDisconnected] = useState<number>(0);
    const [countDisabled, setCountdisabled] = useState<number>(0);

    const [showMore, setShowMore] = useState<boolean>(false);

    // console.log(infoSwitch);

    const handleShowMore = () => {
        setShowMore(!showMore);
    }

    useEffect(() => {
        // Filtrar as portas por tipo
        setFastEthernet(infoSwitch.status_ports.filter(sp => sp.port.toLowerCase().includes("fast")))
        setGigabit(infoSwitch.status_ports.filter(sp => sp.port.toLowerCase().includes("gigabit")))
        setVlanList(infoSwitch.status_ports.filter(sp => sp.port.toLowerCase().includes("vlan")))
        setNullList(infoSwitch.status_ports.filter(sp => sp.port.toLowerCase().includes("null")))

        // Seta quantidades por status
        setCountConnect(infoSwitch.status_ports.filter(sp => sp.status.toLowerCase() === "connected").length);
        setCountDisconnected(infoSwitch.status_ports.filter(sp => sp.status.toLowerCase() === "not_connected").length);
        setCountdisabled(infoSwitch.status_ports.filter(sp => sp.status.toLowerCase() === "disabled").length);


        // console.log(infoSwitch.switch_name, infoSwitch.status_ports);
        // console.log(infoSwitch.switch_name, infoSwitch.status_ports.filter(sp => sp.port.toLowerCase().includes("fast")));
        // console.log(infoSwitch.switch_name, infoSwitch.status_ports.filter(sp => sp.status.toLowerCase() === "connected"));
    }, [infoSwitch]);

    // useMemo(() => {
    //     vlanList.map((l, i) => {
    //         // console.log(l.port.match(/\d+\/\d+/));
    //         console.log(l);
    //     });
    // }, [vlanList]);


    // console.log(infoSwitch);

    return (
        <div className={`bg-zinc-50 border border-zinc-200 p-6 rounded-2xl flex flex-col gap-6`}
        >   
            {/* Nome Switch/ IP Switch / Status*/}
            <div className="flex gap-2 justify-between">
                <div className="flex gap-3">
                    <div 
                        className="bg-blue-100 flex h-fit p-2 rounded-lg"
                    >
                        <FaNetworkWired
                            className="
                                text-blue-500 text-3xl
                            "
                        />
                    </div>

                    <div className="flex flex-col">
                        <span className={`font-bold ${infoSwitch.switch_name ? "" : "text-red-500"}`}>
                            {infoSwitch.switch_name ?? "Error"}
                        </span>
                        <span className="text-zinc-600">
                            {infoSwitch.ip_switch}
                        </span>
                    </div>
                </div>

                <div className={`
                        text-white font-bold
                        h-fit w-fit
                        p-1 rounded-lg
                        ${infoSwitch.status === "success" ? "bg-blue-400" : "bg-red-600"}
                    `}
                >
                    {infoSwitch.status === "success" ? "Online" : "Offline"}
                </div>
            </div>

            {/* Informações Quantidade */}
            {/* Criar Componente separado */}
            <div className="flex flex-wrap gap-3">
                <InfoStatusSw dataAmt={countConnect} icon={FaRegCheckCircle} title="conectadas" iconColor="text-green-500"/>
                <InfoStatusSw dataAmt={countDisconnected} icon={FaRegTimesCircle} title="desconectadas" iconColor="text-zinc-600"/>
                <InfoStatusSw dataAmt={countDisabled} icon={LuCircleMinus} title="desabilitadas" iconColor="text-red-500"/>
                <InfoStatusSw dataAmt={infoSwitch.interface_number ?? 0} icon={FaNetworkWired} title="interfaces" iconColor="text-blue-500"/>
            </div>

            {/* Status grafico das portas */}
            {infoSwitch.switch_name ? (
                <>
                    <div className="flex flex-col  gap-4">
                        {/* Fast */}
                        <PortDetails listPort={fastEthernetList} title="FastEthernet" regexOpc={/\d+\/\d+|\d+/}/>
                        
                        {/* Giga */}
                        <PortDetails listPort={gigabitList} title="Gigabit" regexOpc={/\d+\/\d+|\d+/}/>
                        
                        {showMore ? (
                            <>
                                {/* VLANs */}
                                <PortDetails listPort={vlanList} title="VLANs" regexOpc={/\d+\/\d+|\d+/}/>

                                {/* Null */}
                                <PortDetails listPort={nullList} title="Null" regexOpc={/\d+\/\d+|\d+/}/>
                            </>
                        ) : (null)}
                    </div>
                    <button 
                        onClick={handleShowMore}
                        className="text-zinc-600 flex justify-end gap-2 items-center"
                    >
                        <span>
                            {showMore ? "mostrar menos" : "mostrar mais"} 
                        </span>
                        <IoIosArrowDown className={`transition-all duration-500 ${showMore ? "rotate-180" : "rotate-0"}`}/>
                    </button>
                </>
            ) : (
                <PortDisabled/>
            )}
        </div>
    )
}
