import { requester } from "../http-requests.js";
import { partials, setSessionData } from "./shared.js";
import { isValidRecipe } from "../validators/recipe-validator.js";

const CATEGORY_IMG_URLS = {
    "Grain Food": "https://cdn.pixabay.com/photo/2014/12/11/02/55/corn-syrup-563796__340.jpg",
    "Fruits": "https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg",
    "Milk, cheese, eggs and alternatives": "https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg",
    "Lean meats and poultry, fish and alternatives": "https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg",
    "Vegetables and legumes/beans": "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395__340.jpg",
}

function getRecipeDetails(ctx) {
    setSessionData(ctx);

    const recipeID = ctx.params.id;
    requester.get("appdata", `recipes/${recipeID}`, "Kinvey")
        .then(recipeData => {
            ctx.recipe = recipeData;
            ctx.isAuthor = sessionStorage.getItem("userID") === recipeData._acl.creator;
            ctx.loadPartials(partials).partial("../view/recipe/details.hbs");
        });
}

function getShareRecipe(ctx) {
    setSessionData(ctx);

    ctx.loadPartials(partials).partial("./view/recipe/share.hbs");
}

function postShareRecipe(ctx) {
    const { meal, prepMethod, description, foodImageURL, ingredients, category } = ctx.params;

    const recipe = {
        meal,
        prepMethod,
        description,
        foodImageURL,
        "ingredients": ingredients.split(", "),
        category,
        categoryImageURL: CATEGORY_IMG_URLS[category],
        likesCounter: 0,
    }

    if (isValidRecipe(recipe)) {
        requester.post("appdata", "recipes", recipe, "Kinvey")
            .then(recipeData => {
                ctx.redirect(`recipes/${recipeData._id}`);
            });
    }
}

function getEditRecipe(ctx) {
    const recipeID = ctx.params.id;

    requester.get("appdata", `recipes/${recipeID}`, "Kinvey")
        .then(recipeData => {
            recipeData.ingredients = recipeData.ingredients.join(", ");
            ctx.recipe = recipeData;

            ctx.loadPartials(partials).partial("../view/recipe/edit.hbs");
        });
}

function postEditRecipe(ctx) {
    const recipeID = ctx.params.id;
    const { meal, prepMethod, description, foodImageURL, ingredients, category } = ctx.params;

    const editedRecipe = {
        meal,
        prepMethod,
        description,
        foodImageURL,
        "ingredients": ingredients.split(", "),
        category,
        categoryImageURL: CATEGORY_IMG_URLS[category],
    };

    if (isValidRecipe(editedRecipe)) {
        requester.get("appdata", `recipes/${recipeID}`, "Kinvey")
            .then(recipeData => {
                editedRecipe.likesCounter = recipeData.likesCounter;

                requester.put("appdata", `recipes/${recipeID}`, editedRecipe, "Kinvey")
                    .then(() => {
                        ctx.redirect(`/recipes/${recipeID}`);
                    });
            }).catch(console.error);
    }
}

function archiveRecipe(ctx) {
    const recipeID = ctx.params.id;

    if (confirm("Archive this recipe?")) {
        requester.del("appdata", `recipes/${recipeID}`, "Kinvey")
            .then(() => {
                ctx.redirect("/");
            })

    } else {
        history.back();
    }
}

function likeRecipe(ctx) {
    const recipeID = ctx.params.id;

    requester.get("appdata", `recipes/${recipeID}`, "Kinvey")
        .then(recipeData => {
            recipeData.likesCounter++;

            requester.put("appdata", `recipes/${recipeID}`, recipeData, "Kinvey")
                .then(() => {
                    ctx.redirect(`/recipes/${recipeID}`);
                }).catch(console.error);
        }).catch(console.error);
}

export const recipesController = {
    getRecipeDetails,
    getShareRecipe,
    postShareRecipe,
    getEditRecipe,
    postEditRecipe,
    archiveRecipe,
    likeRecipe,
}