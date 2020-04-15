interface Virus {
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
    capitals: number[],
}

export default Virus;