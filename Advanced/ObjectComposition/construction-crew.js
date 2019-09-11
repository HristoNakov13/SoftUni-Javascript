function administerWater(worker) {
    if (worker.dizziness) {
        let requiredWater = +worker.experience * 0.1 * +worker.weight;
        worker.levelOfHydrated += requiredWater;
        worker.dizziness = false;
    }
    return worker;
}

// console.log(administerWater({ weight: 80,
//     experience: 1,
//     levelOfHydrated: 0,
//     dizziness: true }
// ));