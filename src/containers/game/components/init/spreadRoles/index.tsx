import { useGameContext } from "@contexts/game";
import { ActionIcon, Button } from "@mantine/core";
import classNames from "classnames";
import { FC, useState } from "react";
import { VscCheck } from "react-icons/vsc";
import { FaRandom } from "react-icons/fa";
import { GameContext } from "@contexts/game/types";
import { useEffect } from "react";

interface Props {
    handleClose: Function;
}

const SpreadRoles: FC<Props> = ({ handleClose }) => {
    const [selected, setSelected] = useState<
        GameContext["activeGame"]["usersRole"]
    >([]);

    const { activeGame, users, handleChangeActiveGame } = useGameContext();

    useEffect(() => {
        if (!activeGame.usersRole.length) {
            return undefined;
        }

        setSelected(activeGame.usersRole);
    }, [activeGame.usersRole]);

    const handleSubmit = () => {
        handleChangeActiveGame({
            usersRole: selected,
        });

        handleClose();
    };

    const handleSpreadRoles = () => {
        const usersRoles: GameContext["activeGame"]["usersRole"] = [];
        let users = [...activeGame.users.sort(() => Math.random() - 0.5)];
        let roles = [...activeGame.roles];
        let iUser = 0;

        while (iUser < users.length) {
            let iRole = Math.floor(Math.random() * roles.length);

            if (selected[iUser]?.role.title === roles[iRole].title) {
                iRole =
                    iRole - 1 < 0
                        ? roles[iRole + 1]
                            ? iRole + 1
                            : iRole
                        : iRole - 1;
            }

            if (!roles[iRole]) {
                iUser++;
                break;
            }

            if (roles[iRole].count < 2) {
                usersRoles.push({
                    role: {
                        title: roles[iRole].title,
                        type: roles[iRole].type,
                    },
                    user: users[iUser],
                });
                roles = roles.filter((item, i) => i !== iRole);
            } else {
                usersRoles.push({
                    role: {
                        title: roles[iRole].title,
                        type: roles[iRole].type,
                    },
                    user: users[iUser],
                });
                roles[iRole] = {
                    ...roles[iRole],
                    count: roles[iRole].count - 1,
                };
            }

            iUser++;
        }

        setSelected(usersRoles);
    };

    return (
        <div className="flex flex-col w-full h-full overflow-hidden">
            <ActionIcon
                size="xl"
                color="red"
                radius={9999}
                variant="filled"
                className="absolute top-4 right-4 z-10 shadow transition-all duration-300"
                onClick={() => handleSpreadRoles()}>
                <FaRandom />
            </ActionIcon>

            <div className="w-full h-full overflow-auto scroll-gray-700">
                <div className="grid grid-cols-3 gap-4">
                    {!!selected &&
                        selected.map((item) => (
                            <div
                                className={classNames(
                                    "text-center transition-all duration-300 rounded-3xl cursor-pointer",
                                )}>
                                <div className="h-10 w-10 mx-auto mb-2 relative">
                                    <img
                                        className="mx-auto h-10 w-10 border-2 border-solid border-white rounded-full shadow block"
                                        src={item.user.avatar}
                                        alt=""
                                    />

                                    <div className="bg-black bg-opacity-30 w-full h-full absolute top-0 rounded-full flex items-center justify-center">
                                        <ActionIcon
                                            variant="filled"
                                            color={
                                                item.role.type === "citizen"
                                                    ? "blue"
                                                    : "red"
                                            }
                                            radius={9999}>
                                            <VscCheck />
                                        </ActionIcon>
                                    </div>
                                </div>

                                <div className="font-medium mb-1">
                                    {item.user.name}
                                </div>

                                <div
                                    className={classNames(
                                        "text-xs text-white rounded-full",
                                        item.role.type === "mafia"
                                            ? "bg-red-700"
                                            : "bg-blue-700",
                                    )}>
                                    {item.role.title}
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <div className="w-full pt-4">
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
        </div>
    );
};

export default SpreadRoles;
