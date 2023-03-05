export interface GameContext {
    activeGame: {
        step: TDesignGameSteps;
        players: number;
        type: TGames | null;
        roles: Array<IRole & { count: number }>;
        usersRole: Array<{ user: IUser; role: IRole }>;
        isEnterName: boolean;
        askEnterName: boolean;
    } | null;
    loading: boolean;
    handleResetGame: () => void;
    handleStartGame: (data: {
        step: TDesignGameSteps;
        players: number;
        type: TGames | null;
        roles: Array<IRole & { count: number }>;
        usersRole: Array<{ user: IUser; role: IRole }>;
        isEnterName: boolean;
        askEnterName: boolean;
    }) => void;
    handleChangeGame: (
        data: Partial<{
            step: TDesignGameSteps;
            players: number;
            type: TGames | null;
            roles: Array<IRole & { count: number }>;
            usersRole: Array<{ user: IUser; role: IRole }>;
            isEnterName: boolean;
            askEnterName: boolean;
        }>,
    ) => void;
    handleSetEnterName: (status: boolean) => void;
}
