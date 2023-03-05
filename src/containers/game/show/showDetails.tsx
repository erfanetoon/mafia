import { useGameContext } from "@contexts/game";
import { Button, TextInput } from "@mantine/core";
import classNames from "classnames";
import { FC, useState } from "react";

interface Props {
    data: { user: IUser; role: IRole } | null;
    handleClose: Function;
}

const ShowDetails: FC<Props> = ({ data, handleClose }) => {
    const [name, setName] = useState("");

    const { activeGame, handleChangeGame } = useGameContext();

    const onClose = () => {
        if (!activeGame?.isEnterName) {
            handleClose();

            return null;
        }

        if (!name) {
            return null;
        }

        const roles = activeGame ? [...activeGame?.usersRole] : [];

        activeGame &&
            handleChangeGame({
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
        <div
            className={classNames(
                "text-center transition-all duration-300 rounded-3xl cursor-pointer",
            )}>
            <div
                className={classNames(
                    "text-gray-800 rounded-full inline-block px-12 py-4 font-bold text-2xl bg-white",
                )}>
                {data?.role.title}
            </div>

            {activeGame?.isEnterName && (
                <TextInput
                    value={name}
                    placeholder="ورود نام"
                    label="نام بازیکن"
                    onChange={(e) => setName(e.target.value)}
                    classNames={{
                        root: "mt-4",
                        input: "bg-gray-700",
                    }}
                />
            )}

            <div className="mt-10">
                <Button
                    variant="filled"
                    color="teal"
                    size="sm"
                    fullWidth
                    radius={9999}
                    onClick={() => onClose()}>
                    متوجه شدم
                </Button>
            </div>
        </div>
    );
};

export default ShowDetails;
