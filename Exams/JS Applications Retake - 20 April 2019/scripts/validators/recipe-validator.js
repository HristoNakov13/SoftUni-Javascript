export function isValidRecipe(recipe) {
    return isValidMeal(recipe.meal)
    && isValidCategory(recipe.category)
    && isValidDescription(recipe.description)
    && isValidPrepMethod(recipe.prepMethod)
    && isValidIngredients(recipe.ingredients);
}

function isValidMeal(meal) {
    return meal.length >= 4;
}

function isValidPrepMethod(prepMethod) {
    return prepMethod !== "";
}

function isValidDescription(description) {
    return description !== "";
}

function isValidIngredients(ingridients) {
    return ingridients.length >= 2;
}

function isValidCategory(category) {
    return category !== "Select category...";
}

function isValidFoodImageURL(foodImageURL) {
    console.log(foodImageURL.match(/(http\/\/|https\/\/).+\.jpg/))
    return foodImageURL.match(/(http\/\/|https\/\/).+\.jpg/) !== null;
}