export interface GameContext {
    lastGame: any;
    activeGame: any;
    users: Array<IUser>;
    handleAddUser: (data: IUser) => void;
    handleRemoveUser: (id: number) => void;
}
