//IMPORT
const Roster = require("./lib/Roster")

// FUNCTION DEFINITION
const init = () => {
    const myRoster = new Roster();
    myRoster.generate();
}

// FUNCTION CALLS
init();

