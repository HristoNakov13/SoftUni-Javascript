import CapitalDetails from "./capital-details-interface";

interface VirusDetails {
    name: string,
    description: string,
    sideEffects: string,
    creator: string,
    isCurable: boolean,
    isDeadly: boolean,
    mutation: string,
    turnoverRate: number,
    hoursUntilTurn: number,
    magnitude: string,
    capitals: CapitalDetails[],
}

export default VirusDetails;