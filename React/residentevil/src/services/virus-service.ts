import requester from "../util/requester";

const API_ENDPOINTS = {
    viruses: "/api/viruses",
};

const getAllViruses = (): Promise<any> => {
    return requester.get(API_ENDPOINTS.viruses);
};


const virusService = {
    getAllViruses
};

export default virusService;