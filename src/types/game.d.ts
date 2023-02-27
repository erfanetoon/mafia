type TDesignGameSteps = "showRole" | "manage";

type TRoleTypes = "citizen" | "mafia";

type TGames = "rifleman" | "filimo" | "bartender" | "investigator" | "advanced";

interface IRole {
    title: string;
    type: TRoleTypes;
    min?: number;
    max?: number;
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
