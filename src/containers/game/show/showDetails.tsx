import { useGameContext } from "@contexts/game";
import { ActionIcon, Button, TextInput } from "@mantine/core";
import classNames from "classnames";
import { FC, useState } from "react";
import { VscCheck } from "react-icons/vsc";
interface Props {
    data: { user: IUser; role: IRole } | null;
    handleClose: Function;
}

const ShowDetails: FC<Props> = ({ data, handleClose }) => {
    const [name, setName] = useState("");

    const { activeGame, handleActiveGame } = useGameContext();

    const onClose = () => {
        if (!name) {
            return null;
        }

        const roles = activeGame ? [...activeGame?.usersRole] : [];

        activeGame &&
            handleActiveGame({
                ...activeGame,
                usersRole: roles.map((item) =>
                    item.user.id === data?.user?.id
                        ? {
                              ...item,
                              user: {
                                  ...item.user,
                                  name: name,
                              },
                          }
                        : item,
                ),
            });

        handleClose();
    };

    return (
        <div>
            <div
                className={classNames(
                    "text-center transition-all duration-300 rounded-3xl cursor-pointer",
                )}>
                <div className="h-10 w-10 mx-auto mb-2 relative">
                    <div className="bg-black bg-opacity-30 w-full h-full absolute top-0 rounded-full flex items-center justify-center">
                        <ActionIcon
                            variant="filled"
                            color={
                                data?.role.type === "citizen" ? "blue" : "red"
                            }
                            radius={9999}>
                            <VscCheck />
                        </ActionIcon>
                    </div>
                </div>

                <div className="font-bold text-white mb-2">
                    {data?.user.name}
                </div>

                <div
                    className={classNames(
                        "text-white rounded-full inline-block px-8 py-4 font-bold text-xl mb-4",
                        data?.role.type === "mafia"
                            ? "bg-red-700"
                            : "bg-blue-700",
                    )}>
                    {data?.role.title}
                </div>

                <TextInput
                    value={name}
                    placeholder="ورود نام"
                    label="نام بازیکن"
                    onChange={(e) => setName(e.target.value)}
                    classNames={{
                        input: "bg-gray-700",
                    }}
                />

                <div className="mt-10">
                    <Button
                        variant="filled"
                        color="yellow.6"
                        size="sm"
                        fullWidth
                        radius={9999}
                        onClick={() => onClose()}>
                        متوجه شدم
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ShowDetails;
