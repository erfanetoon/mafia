import { FC, ReactNode } from "react";
import { GameProvider } from "./game";

interface Props {
    children: ReactNode;
}

const ContextsProvider: FC<Props> = ({ children }) => {
    return <GameProvider>{children}</GameProvider>;
};

export default ContextsProvider;
