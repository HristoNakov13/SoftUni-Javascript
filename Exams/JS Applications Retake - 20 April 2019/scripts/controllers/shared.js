export const partials = {
    header: "./view/common/header.hbs",
    footer: "./view/common/footer.hbs"
}

export function setSessionData(ctx) {
    ctx.isLogged = sessionStorage.getItem("fullName") !== null;
    ctx.fullName = sessionStorage.getItem("fullName");
}