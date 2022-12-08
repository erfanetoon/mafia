type TDesignGameSteps = "init" | "showRole" | "manage";

type TRoleTypes = "citizen" | "mafia";

type TGames = "rifleman" | "filimo" | "bartender";

interface IRole {
    title: string;
    type: TRoleTypes;
}

interface IGameTypes {
    rifleman: {
        roles: TRiflemanRoles;
    };
    filimo: {
        roles: TFilimoRoles;
    };
    bartender: {
        roles: TBartenderRoles;
    };
}

interface IGameData<T extends keyof IGameTypes> {
    type: T;
    users: Array<{ id: number; name: string; role: IGameTypes[T]["roles"] }>;
}
