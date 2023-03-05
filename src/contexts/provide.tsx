import { FC, ReactNode } from "react";
import { GameProvider } from "./game";
import { RoutingProvider } from "./routing";

interface Props {
    children: ReactNode;
}

const ContextsProvider: FC<Props> = ({ children }) => {
    return (
        <RoutingProvider>
            <GameProvider>{children}</GameProvider>
        </RoutingProvider>
    );
};

export default ContextsProvider;
