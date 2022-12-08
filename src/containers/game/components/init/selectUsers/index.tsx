import { useGameContext } from "@contexts/game";
import { ActionIcon, Button } from "@mantine/core";
import classNames from "classnames";
import { useEffect } from "react";
import { useState } from "react";
import { FC } from "react";
import { VscCheck } from "react-icons/vsc";
import { toast } from "react-toastify";

interface Props {
    handleClose: Function;
}

const SelectUsers: FC<Props> = ({ handleClose }) => {
    const [selected, setSelected] = useState<Array<IUser>>([]);

    const { users, activeGame, handleChangeActiveGame } = useGameContext();

    useEffect(() => {
        if (!activeGame.users.length) {
            return undefined;
        }

        setSelected(activeGame.users);
    }, [activeGame.users]);

    const handleSubmit = () => {
        handleChangeActiveGame({
            users: selected,
            roles:
                selected.length < activeGame.users.length
                    ? []
                    : activeGame.roles,
            usersRole: [],
        });

        handleClose();
    };

    const handleClickUser = (user: IUser) => {
        const isExist = selected.find((item) => item.id === user.id);

        if (isExist) {
            setSelected((oldState) =>
                oldState.filter((item) => item.id !== user.id),
            );
        } else {
            setSelected((oldState) => [...oldState, user]);
        }
    };

    return (
        <>
            <div className="grid grid-cols-4 gap-4">
                {users.map((item, i) => (
                    <div
                        key={i}
                        className={classNames(
                            "text-center p-2 transition-all duration-300 rounded-3xl cursor-pointer",
                        )}
                        onClick={() => handleClickUser(item)}>
                        <div className="h-12 w-12 mx-auto mb-2 relative">
                            <img
                                className="mx-auto h-12 w-12 border-2 border-solid border-white rounded-full shadow block"
                                src={item.avatar}
                                alt=""
                            />

                            {selected.find((item2) => item.id === item2.id) && (
                                <div className="bg-black bg-opacity-30 w-full h-full absolute top-0 rounded-full flex items-center justify-center">
                                    <ActionIcon
                                        variant="filled"
                                        color="red"
                                        radius={9999}>
                                        <VscCheck />
                                    </ActionIcon>
                                </div>
                            )}
                        </div>

                        <span className="font-medium">{item.name}</span>
                    </div>
                ))}
            </div>

            <div className="absolute w-full bottom-2 right-0 px-2">
                <div className="text-center flex items-center">
                    <Button
                        variant="filled"
                        className="transition-primary rtl:ml-4 ltr:mr-4"
                        color="red"
                        radius={9999}
                        fullWidth
                        type="submit"
                        onClick={() => handleSubmit()}>
                        ذخیره
                    </Button>

                    <Button
                        variant="filled"
                        className="transition-primary"
                        color="gray"
                        radius={9999}
                        onClick={() => handleClose()}>
                        انصراف
                    </Button>
                </div>
            </div>
        </>
    );
};

export default SelectUsers;
