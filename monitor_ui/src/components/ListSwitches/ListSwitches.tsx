import { useEffect, useState } from "react";
import { blockedPorts } from "../../consts/mokMonitor"
import { InfoGeneralCard } from "../InfoGeneralCard/InfoGeneralCard"
import { InfoSwitchCard } from "../InfoSwitchCard/InfoSwitchCard"

import { FaNetworkWired } from "react-icons/fa";
import { getBlockedPorts } from "../../services/monitorService";


export const ListSwiches = () => {
    const [totalSwitches, setTotalSwitches] = useState<number>(0);
    const [totalPorts, setTotalPorts] = useState<number>(0);
    const [totalCnn, setTotalCnn] = useState<number>(0);
    const [totalDesc, setTotalDesc] = useState<number>(0);


    const fetchGetBlockedPorts = async() => {
        await getBlockedPorts();
    }



    useEffect(() => {
        fetchGetBlockedPorts();
        
        setTotalSwitches(blockedPorts.results.length);
        setTotalPorts(blockedPorts.results.reduce((somaTotal, switchAtual) => {
            const portasNesteSwitch = switchAtual.status_ports.length;
            return somaTotal + portasNesteSwitch;
        }, 0));

        setTotalCnn(blockedPorts.results.reduce((somaTotal, switchAtual) => {
            const portasConectadasNesteSwitch = switchAtual.status_ports.filter(porta => {
                return porta.status === "connected";
            });
            return somaTotal + portasConectadasNesteSwitch.length;
        }, 0));

        setTotalDesc(blockedPorts.results.reduce((somaTotal, switchAtual) => {
            const portasConectadasNesteSwitch = switchAtual.status_ports.filter(porta => {
                return porta.status === "not_connected";
            });
            return somaTotal + portasConectadasNesteSwitch.length;
        }, 0));
    }, []);



    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between w-full gap-4">
                <InfoGeneralCard icon={FaNetworkWired} info={totalSwitches} title="Total Switches"/>
                <InfoGeneralCard icon={FaNetworkWired} info={totalPorts} title="Total Portas"/>
                <InfoGeneralCard icon={FaNetworkWired} info={totalCnn} title="Conectadas" optColor="text-green-500"/>
                <InfoGeneralCard icon={FaNetworkWired} info={totalDesc} title="Desconectadas" optColor="text-yellow-500"/>
            </div>

            <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-4">
                {blockedPorts.results.map((infoSwitch, i) => (
                    <InfoSwitchCard infoSwitch={infoSwitch} key={i}/>
                ))}
            </div>
        </div>
    )
}
