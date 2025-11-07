import type { AxiosResponse } from 'axios';

// Tipo da resposta geral da api infra do INPA
export interface responseApiInterface<T> {
    message: string;
    results: T;
}

// Tipo da resposta que e gerada automaticamente pelo AXIOS
export interface responseAxiosInterface<T> extends AxiosResponse{
    data: responseApiInterface<T>
}