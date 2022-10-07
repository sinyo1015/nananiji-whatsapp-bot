const POSITIONS = {
    //North
    "-u" : {
        command: "-gravity North",
        position: "North"
    },

    //North East
    "-tl" : {
        command: "-gravity NorthEast",
        position: "NorthEast"
    },

    //East
    "-t" : {
        command: "-gravity East",
        position: "East"
    },

    //South East
    "-tg" : {
        command: "-gravity SouthEast",
        position: "SouthEast"
    },

    //South
    "-s" : {
        command: "-gravity South",
        position: "South"
    },

    //South West
    "-bd" : {
        command: "-gravity SouthWest",
        position: "SouthWest"
    },

    //West
    "-b" : {
        command: "-gravity West",
        position: "West"
    },

    //North West
    "-bl" : {
        command: "-gravity NorthWest",
        position: "NorthWest"
    },

    //Center
    "-c" : {
        command: "-gravity Center",
        position: "Center"
    }
};

const RATIO_DIMENSIONS = {
    "1:1" : {
        command: "-crop 1:1",
        ratio: "1:1"
    },
    "3:4" : {
        command: "-crop 3:4",
        ratio: "3:4"
    },
    "3:2" : {
        command: "-crop 3:2",
        ratio: "3:2"
    },
}

module.exports = {POSITIONS, RATIO_DIMENSIONS};