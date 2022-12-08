import { Roles } from "@containers/game/settings";
import { useGameContext } from "@contexts/game";
import { ActionIcon, Button } from "@mantine/core";
import classNames from "classnames";
import { useEffect } from "react";
import { FC, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

interface Props {
    handleClose: Function;
}

const SelectRoles: FC<Props> = ({ handleClose }) => {
    const [selected, setSelected] = useState<Array<IRole & { count: number }>>(
        [],
    );
    const [section, setSection] = useState<TRoleTypes>("mafia");

    const { activeGame, handleChangeActiveGame } = useGameContext();

    useEffect(() => {
        if (!activeGame.roles.length) {
            return undefined;
        }

        setSelected(activeGame.roles);
    }, [activeGame.roles]);

    const handleSubmit = () => {
        const citizen = getCountOfCitizen();
        const mafia = getCountOfMafia();

        if (mafia + citizen > activeGame.users.length) {
            toast.warn("تعداد نقش ها نمیتواند از تعداد بازیکنان بیشتر باشد");
            return null;
        }

        if (mafia + citizen < activeGame.users.length) {
            toast.warn("تعداد نقش ها نمیتواند از تعداد بازیکنان کمتر باشد");
            return null;
        }

        handleChangeActiveGame({
            roles: selected,
            usersRole: [],
        });

        handleClose();
    };

    const handleAddRole = (role: IRole) => {
        const item = selected.find(
            (item) => item.type === role.type && item.title === role.title,
        );

        setSelected((oldState) => [
            ...oldState.filter(
                (item) => item.type !== role.type || item.title !== role.title,
            ),
            item ? { ...item, count: item.count + 1 } : { ...role, count: 1 },
        ]);
    };

    const handleRemoveRole = (role: IRole) => {
        const item = selected.find(
            (item) => item.type === role.type && item.title === role.title,
        );

        if (!item) {
            return null;
        }

        setSelected((oldState) => [
            ...oldState.filter(
                (item) => item.type !== role.type || item.title !== role.title,
            ),
            { ...item, count: item.count - 1 },
        ]);
    };

    const getCountOfMafia = () => {
        const items = selected.filter((item) => item.type === "mafia");
        let i = 0;
        let count = 0;

        while (i < items.length) {
            count += items[i].count;
            i++;
        }

        return count;
    };

    const getCountOfCitizen = () => {
        const items = selected.filter((item) => item.type === "citizen");
        let i = 0;
        let count = 0;

        while (i < items.length) {
            count += items[i].count;
            i++;
        }

        return count;
    };

    return (
        <div className="flex flex-col w-full h-full overflow-hidden">
            <div className="bg-dark-600 p-1 rounded-full grid grid-cols-2 gap-1 mb-4 w-full">
                <Button
                    variant={section === "mafia" ? "filled" : "subtle"}
                    radius={9999}
                    className="transition-all duration-300"
                    size="xs"
                    onClick={() => section !== "mafia" && setSection("mafia")}>
                    مافیا
                </Button>

                <Button
                    variant={section === "citizen" ? "filled" : "subtle"}
                    radius={9999}
                    className="transition-all duration-300"
                    color="blue"
                    size="xs"
                    onClick={() =>
                        section !== "citizen" && setSection("citizen")
                    }>
                    شهروند
                </Button>
            </div>

            <div className="overflow-auto scroll-gray-400 h-full">
                <div className="grid grid-cols-3 gap-1">
                    {Roles[activeGame.type || "rifleman"]
                        .filter((item) => item.type === section)
                        .map((item) => (
                            <div
                                className={classNames(
                                    "text-center p-2 transition-all duration-300 rounded-3xl cursor-pointer",
                                )}
                                onClick={() => handleAddRole(item)}>
                                <div className="h-12 w-12 mx-auto mb-2 relative">
                                    <img
                                        className="mx-auto h-12 w-12 border-2 border-solid border-white rounded-full shadow block"
                                        src="/images/icon.png"
                                        alt=""
                                    />

                                    <div
                                        className={classNames(
                                            "bg-opacity-30 w-full h-full absolute top-0 rounded-full flex items-center justify-center",
                                            section === "mafia"
                                                ? "bg-red-500"
                                                : "bg-blue-500",
                                        )}
                                    />
                                </div>

                                <div
                                    className={classNames(
                                        "font-medium mb-2",
                                        section === "mafia"
                                            ? "text-red-500"
                                            : "text-blue-500",
                                    )}>
                                    {item.title}
                                </div>

                                <div className="bg-dark-600 p-1 rounded-full flex items-center justify-between">
                                    <ActionIcon
                                        variant="filled"
                                        color="green"
                                        radius={9999}
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation();

                                            handleAddRole(item);
                                        }}>
                                        <AiOutlinePlus className="text-xs" />
                                    </ActionIcon>

                                    <span className="font-numeric">
                                        {selected.find(
                                            (item2) =>
                                                item.title === item2.title &&
                                                item.type === section,
                                        )?.count || 0}
                                    </span>

                                    <ActionIcon
                                        variant="filled"
                                        color="red"
                                        radius={9999}
                                        size="sm"
                                        disabled={
                                            !selected.find(
                                                (item2) =>
                                                    item.title ===
                                                        item2.title &&
                                                    item.type === section,
                                            )?.count
                                        }
                                        onClick={(e) => {
                                            e.stopPropagation();

                                            handleRemoveRole(item);
                                        }}>
                                        <AiOutlineMinus className="text-xs" />
                                    </ActionIcon>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <div className="text-xs flex items-center w-full py-2">
                <span className="ml-1 text-gray-500">مافیا: </span>

                <span className="font-numeric font-medium">
                    {getCountOfMafia()}
                </span>

                <span className="ml-1 mr-4 text-gray-500">شهروند: </span>

                <span className="font-numeric font-medium">
                    {getCountOfCitizen()}
                </span>
            </div>

            <div className="w-full">
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

export default SelectRoles;
