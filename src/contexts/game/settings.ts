import { GameContext } from "./types";

export const DefaultValue: GameContext = {
    lastGame: null,

    // Active game
    activeGame: {
        roles: [],
        type: null,
        users: [],
        usersRole: [],
    },
    handleChangeActiveGame: () => {},

    // Users
    users: [],
    handleAddUser: () => {},
    handleRemoveUser: () => {},
};
