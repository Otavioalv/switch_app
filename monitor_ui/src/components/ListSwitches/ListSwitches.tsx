import { blockedPorts } from "../../consts/mokMonitor"
import { InfoSwitchCard } from "../InfoSwitchCard/InfoSwitchCard"

export const ListSwiches = () => {
    return (
        <div className="grid grid-cols-2 gap-4">
            {blockedPorts.results.map((infoSwitch, i) => (
                <InfoSwitchCard infoSwitch={infoSwitch} key={i}/>
            ))}
        </div>
    )
}
