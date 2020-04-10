import React from "react";

//dont really like performing this check every damn time theres
//a change event simply to see if I have to get the value with target.value or target.checked
//especially with that "on" because input fields target.checked return boolean values as well and does not apply only for checkboxes
//will add a new change handler here or make a separate factory for checkboxes

// const newValue = event.target.value !== "on"
//     ? event.target.value
//     : event.target.checked;

const onChangeFactory = (setter: Function) => {
    let id: any;

    return (event: any): void => {
        if (id) {
            clearTimeout(id);
            id = undefined;
        }
        const newValue = event.target.value;

        id = setTimeout(() => {
            setter(newValue);
            id = undefined;
        }, 400);
    }
}

export default onChangeFactory;