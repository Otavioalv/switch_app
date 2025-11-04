import { useEffect,  useState } from "react";
import type { infoStatusType, statusPortType } from "../../consts/mokMonitor"
// import { lightTheme } from "../../theme/themes"
import { PortDetails } from "../PortDetails/PortDetails";

import { FaNetworkWired, FaRegCheckCircle, FaRegTimesCircle  } from "react-icons/fa";
import { LuCircleMinus } from "react-icons/lu";


export type InfoSwitchCardProps = {
    infoSwitch: infoStatusType
}

export const InfoSwitchCard = ({infoSwitch}: InfoSwitchCardProps) => {
    const [fastEthernetList, setFastEthernet] = useState<statusPortType[]>([]);
    const [gigabitList, setGigabit] = useState<statusPortType[]>([]);
    const [vlanList, setVlanList] = useState<statusPortType[]>([]);

    const [countConnect, setCountConnect] = useState<number>(0);
    const [countDisconnected, setCountDisconnected] = useState<number>(0);
    const [countDisabled, setCountdisabled] = useState<number>(0);


    // console.log(infoSwitch);

    useEffect(() => {
        // Filtrar as portas por tipo
        setFastEthernet(infoSwitch.status_ports.filter(sp => sp.port.toLowerCase().includes("fast")))
        setGigabit(infoSwitch.status_ports.filter(sp => sp.port.toLowerCase().includes("gigabit")))
        setVlanList(infoSwitch.status_ports.filter(sp => sp.port.toLowerCase().includes("vlan")))

        
        // Seta quantidades por status
        setCountConnect(infoSwitch.status_ports.filter(sp => sp.status.toLowerCase() === "connected").length);
        setCountDisconnected(infoSwitch.status_ports.filter(sp => sp.status.toLowerCase() === "not_connected").length);
        setCountdisabled(infoSwitch.status_ports.filter(sp => sp.status.toLowerCase() === "disabled").length);

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
                        <span className="font-bold">
                            {infoSwitch.switch_name}
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
            <div className="flex gap-3 justify-between">
                
                <div className="flex gap-2 items-center">
                    <FaRegCheckCircle className="text-green-500"/>
                    <span className="font-bold">
                        {countConnect}
                    </span>
                    <span className="text-zinc-600">
                        conectadas
                    </span>
                </div>

                <div className="flex gap-2 items-center text-zinc-600">
                    <FaRegTimesCircle/>
                    <span className="font-bold">
                        {countDisconnected}
                    </span>
                    <span className="text-zinc-600">
                        desconectadas
                    </span>
                </div>
                
                <div className="flex gap-2 items-center ">
                    <LuCircleMinus className="text-red-500"/>
                    <span className="font-bold">
                        {countDisabled}
                    </span>
                    <span className="text-zinc-600">
                        desabilitadas
                    </span>
                </div>

            </div>

            {/* Status grafico das portas */}
            <div className="flex flex-col  gap-4">
                {/* Fast */}
                <PortDetails listPort={fastEthernetList} title="FastEthernet" regexOpc={/\d+\/\d+/}/>
                
                {/* Giga */}
                <PortDetails listPort={gigabitList} title="Gigabit" regexOpc={/\d+\/\d+/}/>
                
                {/* VLANs */}
                <PortDetails listPort={vlanList} title="VLANs" regexOpc={/\d+/}/>
            </div>

        </div>
    )
}
