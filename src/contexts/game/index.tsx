import { getItem, setItem } from "@utilities/localStorage";
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
    const [data, setData] = useState(DefaultValue);

    useEffect(() => {
        setData((oldState) => ({
            ...oldState,
            users: getUsers(),
            activeGame: getGame(),
        }));
    }, []);

    const getGame = () => {
        const game = getItem("game");

        if (!game) {
            return DefaultValue.activeGame;
        }

        return (
            (JSON.parse(
                game || JSON.stringify(DefaultValue.activeGame),
            ) as GameContext["activeGame"]) || DefaultValue.activeGame
        );
    };

    const getUsers = () => {
        const users = getItem("users");

        if (!users) {
            return [];
        }

        return (JSON.parse(users || "[]") as Array<IUser>) || [];
    };

    const handleChangeActiveGame: GameContext["handleChangeActiveGame"] = (
        newData,
    ) => {
        setItem({
            key: "game",
            value: JSON.stringify({ ...data.activeGame, ...newData }),
        });

        setData((oldState) => ({
            ...oldState,
            activeGame: { ...oldState.activeGame, ...newData },
        }));
    };

    const handleAddUser: GameContext["handleAddUser"] = (newUser) => {
        setItem({
            key: "users",
            value: JSON.stringify([...data.users, newUser]),
        });

        setData((oldState) => ({
            ...oldState,
            users: [...oldState.users, newUser],
        }));
    };

    const handleRemoveUser: GameContext["handleRemoveUser"] = (id) => {
        setItem({
            key: "users",
            value: JSON.stringify(data.users.filter((item) => item.id !== id)),
        });

        setData((oldState) => ({
            ...oldState,
            users: oldState.users.filter((item) => item.id !== id),
        }));
    };

    return (
        <Context.Provider
            value={{
                ...data,
                handleChangeActiveGame,
                handleRemoveUser,
                handleAddUser,
            }}>
            {children}
        </Context.Provider>
    );
};

export const useGameContext = () => useContext(Context);
