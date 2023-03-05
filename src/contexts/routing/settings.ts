import { FC } from "react";
import { RoutingContext } from "./types";
import Game from "@pages/game";
import Homepage from "@pages/index";
import NewGame from "@pages/game/new";
import ShowRoles from "@pages/game/show";

export const DefaultValue: RoutingContext = {
    route: "homepage",
    handleChangeRoute: () => {},
};

export const RoutesComponent: Record<TRoutes, FC> = {
    game: Game,
    homepage: Homepage,
    newGame: NewGame,
    showRoles: ShowRoles,
};
