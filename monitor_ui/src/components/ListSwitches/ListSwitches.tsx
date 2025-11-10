import { useCallback, useEffect, useState } from "react";
import { InfoGeneralCard } from "../InfoGeneralCard/InfoGeneralCard"
import { InfoSwitchCard } from "../InfoSwitchCard/InfoSwitchCard"

import { FaNetworkWired, FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import { LuPlug } from "react-icons/lu";

import { getBlockedPorts } from "../../services/monitorService";
import { FilterContainer } from "../FilterContainer/FilterContainer";
import type { infoStatusType } from "../../types/switchType";


export const ListSwiches = () => {
    const [totalSwitches, setTotalSwitches] = useState<number>(0);
    const [totalPorts, setTotalPorts] = useState<number>(0);
    const [totalCnn, setTotalCnn] = useState<number>(0);
    const [totalDesc, setTotalDesc] = useState<number>(0);
    const [switchesData, setSwitchesData] = useState<infoStatusType[]>([]);


    const fetchGetBlockedPorts = useCallback(async () => {
        const result:infoStatusType[] = await getBlockedPorts();
        setSwitchesData(result)
    }, []);

    useEffect(() => {
        fetchGetBlockedPorts();
        
        setTotalSwitches(switchesData.length);
        setTotalPorts(switchesData.reduce((somaTotal, switchAtual) => {
            const portasNesteSwitch = switchAtual.status_ports.length;
            return somaTotal + portasNesteSwitch;
        }, 0));

        setTotalCnn(switchesData.reduce((somaTotal, switchAtual) => {
            const portasConectadasNesteSwitch = switchAtual.status_ports.filter(porta => {
                return porta.status === "connected";
            });
            return somaTotal + portasConectadasNesteSwitch.length;
        }, 0));

        setTotalDesc(switchesData.reduce((somaTotal, switchAtual) => {
            const portasConectadasNesteSwitch = switchAtual.status_ports.filter(porta => {
                return porta.status === "not_connected";
            });
            return somaTotal + portasConectadasNesteSwitch.length;
        }, 0));

    }, [fetchGetBlockedPorts, switchesData]);



    return (
        <section className="flex flex-col gap-2">
            <div className="flex justify-between w-full gap-4 flex-col lg:flex-row">
                <InfoGeneralCard icon={FaNetworkWired} info={totalSwitches} title="Total Switches"/>
                <InfoGeneralCard icon={LuPlug} info={totalPorts} title="Total Portas"/>
                <InfoGeneralCard icon={FaRegCheckCircle} info={totalCnn} title="Conectadas" optColor="text-green-500" />
                <InfoGeneralCard icon={FaRegTimesCircle} info={totalDesc} title="Desconectadas" optColor="text-yellow-500"/>
            </div>

            <div>
                <FilterContainer totalFilter={totalSwitches} originalList={switchesData}/>
            </div>

            <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-4">
                {switchesData.map((infoSwitch, i) => (
                    <InfoSwitchCard infoSwitch={infoSwitch} key={i}/>
                ))}
            </div>
        </section>
    )
}
