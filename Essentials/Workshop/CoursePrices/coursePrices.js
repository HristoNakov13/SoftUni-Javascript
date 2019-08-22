function calculateSignUpPrice(isSignedFundamentals, isSignedAdvanced, isSignedApplications, educationForm) {
    const FUNDAMENTALS_PRICE = 170;
    const ADVANCED_PRICE = 180;
    const APPLICATIONS_PRICE = 190;
    const ADVANCED_DISCOUNT = ADVANCED_PRICE - ADVANCED_PRICE * 0.9;
    const MODULE_DISCOUNT = 0.06;
    const ONLINE_DISCOUNT = 0.06;
    const ONLINE_EDUCATION = "online";

    let price = 0;
    if (isSignedFundamentals) {
        price += FUNDAMENTALS_PRICE;
    }
    if (isSignedAdvanced) {
        price += ADVANCED_PRICE;
    }
    if (isSignedApplications) {
        price += APPLICATIONS_PRICE;
    }

    if (isSignedFundamentals && isSignedAdvanced) {
        price -= ADVANCED_DISCOUNT;
    }

    if (isSignedFundamentals && isSignedAdvanced && isSignedApplications) {
        price -= price * MODULE_DISCOUNT;
    }

    if (educationForm === ONLINE_EDUCATION) {
        price -= price * ONLINE_DISCOUNT;
    }
    let finalPrice = Math.round(price);
    console.log(finalPrice);
}


