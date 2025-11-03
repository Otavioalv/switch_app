import type { infoStatusType } from "../../consts/mokMonitor"
// import { lightTheme } from "../../theme/themes"
// import { FaNetworkWired } from "react-icons/fa";

export type InfoSwitchCardProps = {
    infoSwitch: infoStatusType
}

export const InfoSwitchCard = ({infoSwitch}: InfoSwitchCardProps) => {
    console.log(infoSwitch);

    return (
        <div className={`bg-zinc-100`}
        >
            <div className="flex gap-2">
                {/* Icone */}
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
        </div>
    )
}
