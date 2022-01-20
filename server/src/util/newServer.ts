import Service from '../service';

const servers: any = []; 

const makeServer = (uniqueId: number) => {
    servers.push(new Service(uniqueId)); 
}

export default makeServer; 