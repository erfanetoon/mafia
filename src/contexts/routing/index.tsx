import { createContext, FC, ReactNode, useContext, useState } from "react";
import { DefaultValue } from "./settings";
import { RoutingContext } from "./types";

interface Props {
    children: ReactNode;
}

const Context = createContext<RoutingContext>(DefaultValue);

export const RoutingProvider: FC<Props> = ({ children }) => {
    const [data, setData] = useState<RoutingContext>(DefaultValue);

    const handleChangeRoute: RoutingContext["handleChangeRoute"] = (route) => {
        setData((oldState) => ({
            ...oldState,
            route,
        }));
    };

    return (
        <Context.Provider
            value={{
                ...data,
                handleChangeRoute,
            }}>
            {children}
        </Context.Provider>
    );
};

export const useRouting = () => useContext(Context);
