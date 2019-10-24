// const expect = require("chai").expect;
// const AutoService = require("./02. Auto Service_Ресурси");

describe("testing AutoService", function() {
    const GARAGE_CAPACITY = 5;

    let autoService;
    beforeEach(function () {
        autoService = new AutoService(GARAGE_CAPACITY);
    });

    describe("testing instantiation", function() {
        const DEFAULT_WORK_IN_PROGRESS = [];
        const DEFAULT_BACKLOG_WORK = [];

        it("should instantiate with correct property values", function() {
            let actualGarageCapacity = autoService.garageCapacity;
            let actualWorkInProgress = autoService.workInProgress;
            let actualBacklogWork = autoService.backlogWork;

            expect(actualGarageCapacity).to.equal(GARAGE_CAPACITY);
            expect(actualWorkInProgress).to.deep.equal(DEFAULT_WORK_IN_PROGRESS);
            expect(actualBacklogWork).to.deep.equal(DEFAULT_BACKLOG_WORK);
        });
    });

    const CLIENT = {
        clientName: "Ivan",
        plateNumber: "CAASDF5",
        carInfo: {
            window: "broken",
            engine: "Yamaha",
            door: "broken",
        }
    }

    describe("testing accessors", function() {
        describe("testing availableSpace", function() {
            it("should return correct available space value", function() {
                let actualSpace = autoService.availableSpace;

                expect(actualSpace).to.equal(GARAGE_CAPACITY);
            });

            it("should return correct value when car is added", function() {
                autoService.signUpForReview(CLIENT.clientName, CLIENT.plateNumber, CLIENT.carInfo);
                let expected = GARAGE_CAPACITY - 1;
                let actual = autoService.availableSpace;

                expect(actual).to.equal(expected);
            });
        });
    });


    describe("testing functions", function() {
        describe("testing signUpForReview()", function() {
            it("should add client to workInProgress property when there is available space", function() {
                autoService.signUpForReview(CLIENT.clientName, CLIENT.plateNumber, CLIENT.carInfo);

                let actualClient = autoService.workInProgress[0];

                expect(actualClient).to.deep.equal(CLIENT);     
            });

            it("should add client to backlog property when there is NO available space", function() {
                let fullGarage = new AutoService(1);
                fullGarage.signUpForReview("Ivan", "555", {window: "broken"})
                fullGarage.signUpForReview(CLIENT.clientName, CLIENT.plateNumber, CLIENT.carInfo);

                let actualClient = fullGarage.backlogWork[0];

                expect(actualClient).to.deep.equal(CLIENT); 
            });
        });

        describe("testing carInfo()", function() {
            it("should return correct client", function() {
                autoService.signUpForReview(CLIENT.clientName, CLIENT.plateNumber, CLIENT.carInfo);

                let actualClient = autoService.carInfo(CLIENT.plateNumber, CLIENT.clientName);

                expect(actualClient).to.deep.equal(CLIENT);
            });

            it("should return correct message when client is not found", function() {
                const EXPECTED_MESSAGE = `There is no car with platenumber ${CLIENT.plateNumber} and owner ${CLIENT.clientName}.`;

                let actual = autoService.carInfo(CLIENT.plateNumber, CLIENT.clientName);

                expect(actual).to.equal(EXPECTED_MESSAGE);
            });
        });

        describe("testing repairCar()", function() {
            const CLIENT_INTACT_CAR = {
                clientName: "Pesho",
                plateNumber: "CASD4",
                carInfo: {
                    window: "glass",
                    engine: "Suzuki",
                }
            };

            it("should return correct message when no cars to repair", function() {
                const EXPECTED_NO_CLIENTS_MESSAGE = "No clients, we are just chilling...";

                let actual = autoService.repairCar();

                expect(actual).to.equal(EXPECTED_NO_CLIENTS_MESSAGE);
            });

            it("should repair the correct broken parts", function() {
                const EXPECTED_CAR_REPAIRED_MESSAGE = `Your window and door were repaired.`;
                autoService.signUpForReview(CLIENT.clientName, CLIENT.plateNumber, CLIENT.carInfo);
                let actual = autoService.repairCar();

                expect(actual).to.equal(EXPECTED_CAR_REPAIRED_MESSAGE);
            });

            it("should return correct message when no parts to repair on intact car", function() {
                const EXPECTED_NO_BROKE_PARTS_FOUND_MESSAGE = "Your car was fine, nothing was repaired.";
                autoService.signUpForReview(CLIENT_INTACT_CAR.clientName, CLIENT_INTACT_CAR.plateNumber, CLIENT_INTACT_CAR.carInfo);

                let actual = autoService.repairCar();

                expect(actual).to.equal(EXPECTED_NO_BROKE_PARTS_FOUND_MESSAGE);
            });

            it("should correctly change available space when a car is repaired", function() {
                autoService.signUpForReview(CLIENT.clientName, CLIENT.plateNumber, CLIENT.carInfo);
                autoService.repairCar();

                let actual = autoService.availableSpace;

                expect(actual).to.equal(GARAGE_CAPACITY);
            });
        });
    });
});