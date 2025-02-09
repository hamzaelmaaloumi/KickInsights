import axios from 'axios'


const BASE_URL = 'http://127.0.0.1:8000/api/';

class httpService {
    private endpoint: string

    constructor(endpoint: string){
        this.endpoint = endpoint;
    }

    public getAll(){
        const controller = new AbortController()
        let request = axios.get(BASE_URL+this.endpoint+'/', {signal: controller.signal})

        return {request, controller};
    }

    public add<T>(entity: T){
        return axios.post(BASE_URL+this.endpoint+'/create', entity)
    }

    public delete(id: number){
        return axios.delete(BASE_URL+this.endpoint+'/'+id)
    }

    public update<T>(id:number, entity:T){
        return axios.put(BASE_URL+this.endpoint+'/'+id, entity)
    }

}


export default httpService;