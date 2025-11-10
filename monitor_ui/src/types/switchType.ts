export type statusPortType = {
    port: string;
    status: string;
}


export type blockedPortsType = {
    message: string;
    results: infoStatusType[]
}

export type infoStatusType = {
    interface_number: number | null,
    switch_name: string | null,
    ip_switch: string,
    status: string,
    status_ports: statusPortType[]
}
