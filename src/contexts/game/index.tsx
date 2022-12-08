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
        getUsers();

        setData((oldState) => ({
            ...oldState,
            users: getUsers(),
        }));
    }, []);

    const getUsers = () => {
        const users = getItem("users");

        if (!users) {
            return [];
        }

        return (JSON.parse(getItem("users") || "[]") as Array<IUser>) || [];
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

    console.log(data);
    return (
        <Context.Provider value={{ ...data, handleRemoveUser, handleAddUser }}>
            {children}
        </Context.Provider>
    );
};

export const useGameContext = () => useContext(Context);
