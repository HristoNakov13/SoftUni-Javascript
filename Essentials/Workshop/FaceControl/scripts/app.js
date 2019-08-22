function getData () {
    let textAreaInput = document.getElementById("input").querySelector("textarea");
    let input = JSON.parse(textAreaInput.value);

	let peopleInElement = document.getElementById("peopleIn").querySelector("p");
	let peopleOutElement = document.getElementById("peopleOut").querySelector("p");
	let blacklistElement = document.getElementById("blacklist").querySelector("p");

    let peopleIn = [];
    let peopleOut = [];
    let blacklist = [];

    for (const person of input) {
        let action = person["action"];
        let index;
        if (person["lastName"] === undefined) {
            continue;
        }

        switch (action) {
            case "peopleIn":
                if (containsPerson(person, blacklist) === -1) {
                    peopleIn.push(person);
                }
                break;
            case "peopleOut":
                index = containsPerson(person, peopleIn);
                if (index !== -1) {
                    peopleIn.splice(index, 1);
                    peopleOut.push(person);
                }
                break;
            case "blacklist":
                index = containsPerson(person, peopleIn);
                if (index !== -1) {
                    peopleIn.splice(index, 1);
                    peopleOut.push(person);
                }
                blacklist.push(person);
                break;
        }
    }

    let sort = input[input.length - 1];
    let criteria = sort["criteria"];
    let action = sort["action"];
    console.log(sort);

    if (action !== "" && criteria !== "") {
        let section;
        switch (action) {
            case "peopleIn":
                section = peopleIn;
                break;
            case "peopleOut":
                section = peopleOut;
                break;
            default:
                section = blacklist;
                break;
        }
        section.sort((first, second) => {
            return first[criteria].localeCompare(second[criteria]);
        })
    }
    let wtf = stringifyArray(peopleIn);
    peopleInElement.innerHTML = stringifyArray(peopleIn);
    peopleOutElement.innerHTML = stringifyArray(peopleOut);
    blacklistElement.innerHTML = stringifyArray(blacklist);

    function containsPerson(person, list) {
        // return list.some(dude => {
        //     return dude["firstName"] === person["firstName"] &&
        //         dude["lastName"] === person["lastName"];
        // });

        let index = -1;
        for (let i = 0; i < list.length; i++) {
            if (list[i]["firstName"] === person.firstName &&
                list[i]["lastName"] === person.lastName) {
                index = i;
                break;
            }
        }
        return index;
    }

    function stringifyArray(array) {
        let result = "";
        for (const person of array) {
            delete person.action;
            result += JSON.stringify(person) + " ";
        }
        return result.substring(0, result.length - 1);
    }
}
