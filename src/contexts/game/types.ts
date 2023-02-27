export interface GameContext {
    activeGame: {
        step: TDesignGameSteps;
        players: number;
        type: TGames | null;
        roles: Array<IRole & { count: number }>;
        usersRole: Array<{ user: IUser; role: IRole }>;
    } | null;
    loading: boolean;
    handleResetGame: () => void;
    handleActiveGame: (data: {
        step: TDesignGameSteps;
        players: number;
        type: TGames | null;
        roles: Array<IRole & { count: number }>;
        usersRole: Array<{ user: IUser; role: IRole }>;
    }) => void;
}
