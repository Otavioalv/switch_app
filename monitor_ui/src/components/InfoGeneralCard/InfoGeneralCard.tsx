import type { IconType } from "react-icons";

export type InfoGeneralCardProps = {
    icon: IconType,
    title: string,
    info: number,
    totalInfo?: number
    optColor?: string,
}

export const InfoGeneralCard = ({icon: Icon, info, title, optColor="text-black"}: InfoGeneralCardProps) => {
    return (
        <div className="bg-zinc-50 border border-zinc-200 w-full rounded-2xl p-6 flex items-center gap-4">
            <div className="bg-zinc-200 p-3 rounded-md">
                <Icon className={optColor}/>
            </div>
            
            <div className="flex flex-col">
                <span className="text-zinc-500">{title}</span>
                <span className={`font-bold text-lg ${optColor}`}>{info}</span>
            </div>
        </div>
    );
}
