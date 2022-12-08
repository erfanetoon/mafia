import { FC } from "react";
import Init from "./init";
import Manage from "./manage";
import ShowRole from "./showRole";
import { IComponentProps } from "./types";

const Components: Record<TDesignGameSteps, FC<IComponentProps>> = {
    init: Init,
    manage: Manage,
    showRole: ShowRole,
};

export default Components;
