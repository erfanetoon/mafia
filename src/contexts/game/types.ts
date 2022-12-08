export interface GameContext {
    lastGame: any;

    // Active game
    activeGame: {
        step: TDesignGameSteps;
        type: TGames | null;
        users: Array<IUser>;
        roles: Array<IRole & { count: number }>;
        usersRole: Array<{ user: IUser; role: IRole }>;
    };
    handleChangeActiveGame: (data: Partial<GameContext["activeGame"]>) => void;

    // Users
    users: Array<IUser>;
    handleAddUser: (data: IUser) => void;
    handleRemoveUser: (id: number) => void;
}
