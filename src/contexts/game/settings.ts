import { GameContext } from "./types";

export const DefaultValue: GameContext = {
    lastGame: null,

    // Active game
    activeGame: {
        step: "init",
        roles: [],
        type: "rifleman",
        users: [],
        usersRole: [],
    },
    handleChangeActiveGame: () => {},

    // Users
    users: [],
    handleAddUser: () => {},
    handleRemoveUser: () => {},
};
