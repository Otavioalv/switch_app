import { blockedPorts } from "../../consts/mokMonitor"
import { InfoSwitchCard } from "../InfoSwitchCard/InfoSwitchCard"

export const ListSwiches = () => {
    return (
        <div className="flex flex-col gap-1">
            {blockedPorts.results.map((infoSwitch, i) => (
                <InfoSwitchCard infoSwitch={infoSwitch} key={i}/>
            ))}
        </div>
    )
}
