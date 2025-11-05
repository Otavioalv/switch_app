import type { IconType } from "react-icons"


export type InforStatusProps = {
    icon: IconType,
    iconColor: string, 
    dataAmt: number,
    title: string
}

export const InfoStatusSw = ({dataAmt, icon:Icon, title, iconColor}: InforStatusProps) => {
    return (
        <div className="flex gap-2 items-center">
            <Icon className={iconColor}/>

            <span className="font-bold">
                {dataAmt}
            </span>
            <span className="text-zinc-600">
                {title}
            </span>
        </div>
    )
}