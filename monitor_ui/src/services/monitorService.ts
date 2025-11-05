import monitorApi from "./monitorApi";

export const getBlockedPorts = async () =>  {
    try {
        const res = await monitorApi.post("/switch/get-blocked-ports")

        console.log(res.data);

        return 0;
    } catch(err) {
        console.log("error: ", err);
        return 0;
    }
}