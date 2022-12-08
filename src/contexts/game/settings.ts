import { GameContext } from "./types";

export const DefaultValue: GameContext = {
    activeGame: null,
    lastGame: null,
    users: [],
    handleAddUser: () => {},
    handleRemoveUser: () => {},
};
