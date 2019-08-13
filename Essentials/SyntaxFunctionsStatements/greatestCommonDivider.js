function findGreatestCommonDivider(firstNum, secondNum) {
    let result = 0;
    let biggest = Math.max(firstNum, secondNum);
    let smallest = Math.min(firstNum, secondNum);

    if (biggest % smallest === 0) {
        result = smallest;
    } else {
        for (let i = smallest; i > 0 ; i--) {
            if (smallest % i === 0 && biggest % i === 0) {
                result = i;
                break;
            }
        }
    }
    console.log(result);
}
