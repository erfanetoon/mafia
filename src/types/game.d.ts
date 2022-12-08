type TRoleTypes = "citizen" | "mafia";

type TGames = "rifleman" | "filimo" | "bartender";

type TRiflemanRoles = "شهروند ساده" | "s";
type TFilimoRoles = "شهروند ساده" | "b";
type TBartenderRoles = "شهروند ساده" | "a";

interface IRole {
    name: string;
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
