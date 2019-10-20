class Computer {
    constructor(ramMemory, cpuGHz, hddMemory) {
        this.ramMemory = ramMemory;
        this.cpuGHz = cpuGHz;
        this.hddMemory = hddMemory;
        this.taskManager = [];
        this.installedPrograms = [];
    }

    installAProgram(name, requiredSpace) {
        if (!this.hasFreeSpace(requiredSpace)) {
            throw new Error("There is not enough space on the hard drive");
        }

        let program = {
            name,
            requiredSpace,
        };

        this.installedPrograms.push(program);
        this.hddMemory -= requiredSpace;

        return program;
    }

    hasFreeSpace(requiredSpace) {
        return this.hddMemory >= requiredSpace;
    }

    uninstallAProgram(name) {
        let uninstallProgram = this.findProgram(name);

        if (uninstallProgram === undefined) {
            throw new Error("Control panel is not responding");
        }

        let freedSpace = uninstallProgram.requiredSpace;
        this.hddMemory += freedSpace;

        this.installedPrograms.splice(this.installedPrograms.indexOf(uninstallProgram), 1);

        return this.installedPrograms;
    }

    openAProgram(name) {
        let program = this.findProgram(name);

        if (program === undefined) {
            throw new Error(`The ${name} is not recognized`);
        } else if (this.isRunning(program)) {
            throw new Error(`The ${name} is already open`);
        }

        let ramUsage = this.calculateRamUsage(program);
        let cpuUsage = this.calculateCpuUsage(program);

        if (!this.hasAvailableMemory(ramUsage)) {
            throw new Error(`${program.name} caused out of memory exception`);
        } else if (!this.hasAvailableCPU(cpuUsage)) {
            throw new Error(`${program.name} caused out of cpu exception`);
        }

        let runningProgram = {
            name: program.name,
            ramUsage,
            cpuUsage,
        };

        this.taskManager.push(runningProgram);

        return runningProgram;
    }

    getSystemRamUsage(taskManager) {
        let systemRamUsage = 0;
        taskManager.forEach(program => systemRamUsage += program.ramUsage);

        return systemRamUsage;
    }

    getSystemCpuUsage(taskManager) {
        let systemCpuUsage = 0;
        taskManager.forEach(program => systemCpuUsage += program.cpuUsage);

        return systemCpuUsage;
    }

    hasAvailableMemory(programRamUsage) {
        return this.getSystemRamUsage(this.taskManager) + programRamUsage < 100;
    }

    hasAvailableCPU(programCpuUsage) {
        return this.getSystemCpuUsage(this.taskManager) + programCpuUsage < 100;
    }

    calculateRamUsage(program) {
        return (program.requiredSpace / this.ramMemory) * 1.5;
    }

    calculateCpuUsage(program) {
        return ((program.requiredSpace / this.cpuGHz) / 500) * 1.5;
    }

    findProgram(name) {
        return this.installedPrograms.find(program => program.name === name);
    }

    isRunning(program) {
        let name = program.name;
        let foundProgram = this.taskManager.find(runningProgram => runningProgram.name === name);

        return foundProgram !== undefined;
    }

    taskManagerView() {
        if (this.taskManager.length === 0) {
            return "All running smooth so far";
        }

        let taskManagerReport = "";

        for (const program of this.taskManager) {
            taskManagerReport += `Name - ${program.name} | Usage - CPU: ${program.cpuUsage.toFixed(0)}%, RAM: ${program.ramUsage.toFixed(0)}%\n`;
        }

        return taskManagerReport.trim();
    }
}