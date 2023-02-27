import { getItem, removeItem, setItem } from "@utilities/localStorage";
import {
    createContext,
    FC,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { DefaultValue } from "./settings";
import { GameContext } from "./types";

interface Props {
    children: ReactNode;
}

const Context = createContext<GameContext>(DefaultValue);

export const GameProvider: FC<Props> = ({ children }) => {
    const [data, setData] = useState<GameContext>(DefaultValue);

    useEffect(() => {
        setData((oldState) => ({
            ...oldState,
            activeGame: getGame(),
            loading: false,
        }));
    }, []);

    const getGame = () => {
        const game = getItem("activeGame");

        if (!game) {
            return null;
        }

        return (JSON.parse(game) as GameContext["activeGame"]) || null;
    };

    const handleResetGame: GameContext["handleResetGame"] = () => {
        removeItem("activeGame");

        setData((oldState) => ({
            ...oldState,
            activeGame: DefaultValue.activeGame,
        }));
    };

    const handleActiveGame: GameContext["handleActiveGame"] = (data) => {
        setItem({
            key: "activeGame",
            value: JSON.stringify(data),
        });

        setData((oldState) => ({
            ...oldState,
            activeGame: data,
        }));
    };

    return (
        <Context.Provider
            value={{
                ...data,
                handleResetGame,
                handleActiveGame,
            }}>
            {children}
        </Context.Provider>
    );
};

export const useGameContext = () => useContext(Context);
