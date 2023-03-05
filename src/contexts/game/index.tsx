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
        getGame();
    }, []);

    const getGame = () => {
        const game = getItem("activeGame");

        if (!game) {
            setData((oldState) => ({
                ...oldState,
                loading: false,
            }));

            return null;
        }

        setData((oldState) => ({
            ...oldState,
            activeGame: (JSON.parse(game) as GameContext["activeGame"]) || null,
            loading: false,
        }));
    };

    const handleResetGame: GameContext["handleResetGame"] = () => {
        removeItem("activeGame");

        setData((oldState) => ({
            ...oldState,
            activeGame: DefaultValue.activeGame,
        }));
    };

    const handleStartGame: GameContext["handleStartGame"] = (data) => {
        setItem({
            key: "activeGame",
            value: JSON.stringify(data),
        });

        setData((oldState) => ({
            ...oldState,
            activeGame: data,
        }));
    };

    const handleChangeGame: GameContext["handleChangeGame"] = (newData) => {
        if (!data.activeGame) {
            return undefined;
        }

        setItem({
            key: "activeGame",
            value: JSON.stringify({ ...data.activeGame, ...newData }),
        });

        // @ts-ignore
        setData((oldState: GameContext) => ({
            ...oldState,
            activeGame: {
                ...oldState.activeGame,
                ...newData,
            },
        }));
    };

    const handleSetEnterName: GameContext["handleSetEnterName"] = (status) => {
        if (!data.activeGame) {
            return undefined;
        }

        setItem({
            key: "activeGame",
            value: JSON.stringify({
                ...data.activeGame,
                askEnterName: true,
                isEnterName: status,
            }),
        });

        setData({
            ...data,
            activeGame: {
                ...data.activeGame,
                askEnterName: true,
                isEnterName: status,
            },
        });
    };

    return (
        <Context.Provider
            value={{
                ...data,
                handleResetGame,
                handleStartGame,
                handleChangeGame,
                handleSetEnterName,
            }}>
            {children}
        </Context.Provider>
    );
};

export const useGameContext = () => useContext(Context);
