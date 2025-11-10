// import type { responseAxiosInterface } from "../types/apiTypes";
// import monitorApi from "./monitorApi";
import { blockedPorts } from "../consts/mokMonitor";
import type { infoStatusType } from "../types/switchType";

export const getBlockedPorts = async (): Promise<infoStatusType[]> =>  {
    try {
        // const res = await monitorApi.post("/switch/get-blocked-ports") as responseAxiosInterface<infoStatusType[]>
        // return res.data.results;

        return blockedPorts.results
    } catch(err) {
        console.log("error: ", err);

        return [];
    }
}
