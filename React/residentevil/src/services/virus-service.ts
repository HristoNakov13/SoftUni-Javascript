import requester from "../util/requester";

import Virus from "../components/VirusForm/virus-interface";
import VirusDetails from "../components/VirusDetails/virus-details-interface";

const ROOT_ENDPOINT = "/api/viruses";

//Not sure if its better to return a single object containing all needed form resources 
//Or do a seperate request for each
const API_ENDPOINTS = {
    viruses: ROOT_ENDPOINT,
    mutations: ROOT_ENDPOINT + "/mutations",
    magnitudes: ROOT_ENDPOINT + "/magnitudes",
    capitals: ROOT_ENDPOINT + "/capitals",
    createVirus: ROOT_ENDPOINT + "/create",
    editVirus: ROOT_ENDPOINT + "/edit",
    deleteVirus: ROOT_ENDPOINT
};

//should object interfaces be imported here?

const virusService = {
    getAllViruses: (): Promise<any[]> => {
        return requester.get(API_ENDPOINTS.viruses);
    },

    getAvailableMutations: (): Promise<string[]> => {
        return requester.get(API_ENDPOINTS.mutations);
    },

    getAvailableMagnitudes: (): Promise<string[]> => {
        return requester.get(API_ENDPOINTS.magnitudes);
    },

    getAvailableCapitals: (): Promise<any[]> => {
        return requester.get(API_ENDPOINTS.capitals);
    },

    createVirus: (virus: Virus): Promise<any> => {
        return requester.post(API_ENDPOINTS.createVirus, virus);
    },

    getVirusById: (id: string): Promise<VirusDetails> => {
        return requester.get(API_ENDPOINTS.viruses + `/${id}`);
    },

    editVirus: (virus: VirusDetails): Promise<any> => {
        return requester.put(API_ENDPOINTS.editVirus, virus);
    },

    deleteVirus: (id: string): Promise<any> => {
        return requester.del(API_ENDPOINTS.deleteVirus, { id })
    }
};

export default virusService;