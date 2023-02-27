import { ActionIcon, Button, Modal } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Roles } from "../settings";
import classNames from "classnames";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { VscAdd } from "react-icons/vsc";

interface Props {
    formData: {
        game: TGames | null;
        players: number;
        roles: Array<IRole & { count: number }>;
    };
    setFormData: Function;
}

const Role: FC<Props> = ({ formData, setFormData }) => {
    const [isShow, setIsShow] = useState(false);
    const [selected, setSelected] = useState<Array<IRole & { count: number }>>(
        [],
    );
    const [section, setSection] = useState<TRoleTypes>("mafia");

    useEffect(() => {
        if (!formData.roles) {
            return undefined;
        }

        setSelected(formData.roles);
    }, [formData.roles]);

    const handleSubmit = () => {
        const citizen = getCountOfCitizen();
        const mafia = getCountOfMafia();

        if (mafia + citizen > formData.players) {
            toast.warn("تعداد نقش ها نمیتواند از تعداد بازیکنان بیشتر باشد");
            return null;
        }

        if (mafia + citizen < formData.players) {
            toast.warn("تعداد نقش ها نمیتواند از تعداد بازیکنان کمتر باشد");
            return null;
        }

        setIsShow(false);
        setFormData({
            ...formData,
            roles: selected,
        });
        setSelected([]);
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

    const getCountOfMafiaFormData = () => {
        const items = formData.roles.filter((item) => item.type === "mafia");
        let i = 0;
        let count = 0;

        while (i < items.length) {
            count += items[i].count;
            i++;
        }

        return count;
    };

    const getCountOfCitizenFormData = () => {
        const items = formData.roles.filter((item) => item.type === "citizen");
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
            <div
                className="bg-black bg-opacity-20 rounded-full p-4 cursor-pointer"
                onClick={() => setIsShow(true)}>
                <div className="flex items-center mb-2">
                    <span className="text-md font-medium ml-2">نقش ها</span>

                    <span className="text-xs font-numeric text-gray-500 ml-auto">
                        {getCountOfCitizenFormData() +
                            getCountOfMafiaFormData() +
                            " نقش"}
                    </span>

                    <ActionIcon radius={9999} variant="filled" color="red">
                        <VscAdd />
                    </ActionIcon>
                </div>

                <div className="text-xs flex items-center">
                    <span className="ml-1 text-gray-500">مافیا: </span>

                    <span className="font-numeric font-medium">
                        {getCountOfMafiaFormData()}
                    </span>

                    <span className="ml-1 mr-4 text-gray-500">شهروند: </span>

                    <span className="font-numeric font-medium">
                        {getCountOfCitizenFormData()}
                    </span>
                </div>
            </div>

            <Modal
                opened={isShow}
                onClose={() => setIsShow(false)}
                size="md"
                withCloseButton={false}
                centered
                fullScreen
                classNames={{
                    modal: "bg-dark-500 p-4 relative h-full overflow-hidden",
                    body: "h-full",
                }}>
                <div className="flex flex-col w-full h-full overflow-hidden">
                    <div className="bg-dark-600 p-1 rounded-full grid grid-cols-2 gap-1 mb-4 w-full">
                        <Button
                            variant={section === "mafia" ? "filled" : "subtle"}
                            radius={9999}
                            className="transition-all duration-300"
                            size="xs"
                            onClick={() =>
                                section !== "mafia" && setSection("mafia")
                            }>
                            مافیا
                        </Button>

                        <Button
                            variant={
                                section === "citizen" ? "filled" : "subtle"
                            }
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
                            {formData.game &&
                                Roles[formData.game]
                                    .filter((item) => item.type === section)
                                    .map((item, i) => (
                                        <div
                                            key={i}
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
                                                            item.title ===
                                                                item2.title &&
                                                            item.type ===
                                                                section,
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
                                                                item.type ===
                                                                    section,
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

                        <span className="ml-1 mr-4 text-gray-500">
                            شهروند:{" "}
                        </span>

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
                                onClick={() => setIsShow(false)}>
                                انصراف
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Role;
