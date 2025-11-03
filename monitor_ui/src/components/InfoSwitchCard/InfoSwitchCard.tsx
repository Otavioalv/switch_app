import { useEffect, useState } from "react";
import type { infoStatusType, statusPortType } from "../../consts/mokMonitor"
// import { lightTheme } from "../../theme/themes"
import { FaNetworkWired } from "react-icons/fa";

export type InfoSwitchCardProps = {
    infoSwitch: infoStatusType
}

export const InfoSwitchCard = ({infoSwitch}: InfoSwitchCardProps) => {
    const [fastEthernetList, setFastEthernet] = useState<statusPortType[]>([]);
    const [gigabitList, setGigabit] = useState<statusPortType[]>([]);
    const [vlanList, setVlanList] = useState<statusPortType[]>([]);

    useEffect(() => {
        // Filtrar as portas por tipo
        setFastEthernet(infoSwitch.status_ports.filter(sp => sp.port.toLowerCase().includes("fast")))
        setGigabit(infoSwitch.status_ports.filter(sp => sp.port.toLowerCase().includes("gigabit")))
        setVlanList(infoSwitch.status_ports.filter(sp => sp.port.toLowerCase().includes("vlan")))
        
        // console.log(infoSwitch.status_ports)
    }, [infoSwitch]);


    // console.log(infoSwitch);

    return (
        <div className={`bg-zinc-100`}
        >   
            {/* Nome Switch/ IP Switch / Status*/}
            <div className="flex gap-2">
                <FaNetworkWired/>

                <div className="flex flex-col">
                    <span>
                        {infoSwitch.switch_name}
                    </span>
                    <span>
                        {infoSwitch.ip_switch}
                    </span>
                </div>
                
                <div>
                    {infoSwitch.status === "success" ? "Online" : "Offline"}
                </div>
            </div>

            {/* Informações Quantidade */}
            <div>

            </div>

            {/* Status grafico das portas */}
            <div>
                {/* Fast */}
                <span>
                    FastEthernet
                </span>
                {fastEthernetList.map((l, i) => (
                    <div>
                        {l.port}
                        {l.status}
                        {i}
                    </div>
                ))}

                {/* Giga */}
                <span>
                    Gigabit
                </span>
                {gigabitList.map((l, i) => (
                    <div>
                        {l.port}
                        {l.status}
                        {i}
                    </div>
                ))}
                {/* VLANs */}
                <span>
                    VLANs
                </span>
                {vlanList.map((l, i) => (
                    <div>
                        {l.port}
                        {l.status}
                        {i}
                    </div>
                ))}
            </div>

        </div>
    )
}
