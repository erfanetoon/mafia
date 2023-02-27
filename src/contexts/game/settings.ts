import { GameContext } from "./types";

export const DefaultValue: GameContext = {
    activeGame: null,
    loading: true,
    handleResetGame: () => {},
    handleActiveGame: () => {},
};
