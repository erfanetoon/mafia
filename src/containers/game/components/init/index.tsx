import { Games } from "@containers/game/settings";
import { useGameContext } from "@contexts/game";
import { ActionIcon, Button, Modal, Select } from "@mantine/core";
import { FC, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { BiTrash } from "react-icons/bi";
import { IComponentProps } from "../types";
import SelectRoles from "./selectRoles";
import SelectUsers from "./selectUsers";
import SpreadRoles from "./spreadRoles";
import { DefaultValue } from "@contexts/game/settings";
import { openConfirmModal } from "@mantine/modals";

const Init: FC<IComponentProps> = ({ setStep }) => {
    const [isShowSelectUserModal, setIsShowSelectUserModal] = useState(false);
    const [isShowSelectRoleModal, setIsShowSelectRoleModal] = useState(false);
    const [isShowSpreadRolesModal, setIsShowSpreadRolesModal] = useState(false);

    const { activeGame, handleChangeActiveGame } = useGameContext();

    const confirmModal = () =>
        openConfirmModal({
            classNames: {
                modal: "bg-dark-500 p-4",
            },
            centered: true,
            title: "از ریست کردن تمامی فیلد ها اطمینان دارید ؟",
            labels: { confirm: "پاک کردن", cancel: "انصراف" },
            cancelProps: {
                radius: 9999,
            },
            confirmProps: {
                radius: 9999,
            },
            onCancel: () => {},
            onConfirm: () => handleClear(),
        });

    const handleClear = () => {
        handleChangeActiveGame(DefaultValue.activeGame);
    };

    const handleChangeType = (value: TGames) => {
        handleChangeActiveGame({
            roles: [],
            usersRole: [],
            type: value,
        });
    };

    const getCountOfMafia = () => {
        const items = activeGame.roles.filter((item) => item.type === "mafia");
        let i = 0;
        let count = 0;

        while (i < items.length) {
            count += items[i].count;
            i++;
        }

        return count;
    };

    const getCountOfCitizen = () => {
        const items = activeGame.roles.filter(
            (item) => item.type === "citizen",
        );
        let i = 0;
        let count = 0;

        while (i < items.length) {
            count += items[i].count;
            i++;
        }

        return count;
    };

    return (
        <div className="w-full">
            <div className="mb-6">
                <Select
                    label="سبک بازی"
                    variant="filled"
                    placeholder="انتخاب کنید"
                    radius={9999}
                    value={activeGame.type}
                    classNames={{
                        label: "mb-1 text-xs",
                        input: "border-gray-600 bg-transparent",
                    }}
                    onChange={handleChangeType}
                    data={Games.map((item) => ({
                        label: item.label,
                        value: item.value,
                    }))}
                />
            </div>

            <div className="mb-6">
                <div
                    className="bg-black bg-opacity-20 rounded-full p-4 flex items-center cursor-pointer"
                    onClick={() => setIsShowSelectUserModal(true)}>
                    <span className="text-md font-medium ml-2">بازیکن ها</span>

                    <span className="text-xs font-numeric text-gray-500 ml-auto">
                        {activeGame.users.length + " بازیکن"}
                    </span>

                    <ActionIcon radius={9999} variant="filled" color="red">
                        <VscAdd />
                    </ActionIcon>
                </div>

                <Modal
                    opened={isShowSelectUserModal}
                    onClose={() => setIsShowSelectUserModal(false)}
                    size="md"
                    withCloseButton={false}
                    centered
                    overflow="inside"
                    classNames={{
                        modal: "bg-dark-500 p-3 pb-16 relative",
                    }}>
                    <SelectUsers
                        handleClose={() => setIsShowSelectUserModal(false)}
                    />
                </Modal>
            </div>

            <div className="mb-6">
                <div
                    className="bg-black bg-opacity-20 rounded-full p-4 cursor-pointer"
                    onClick={() => setIsShowSelectRoleModal(true)}>
                    <div className="flex items-center mb-2">
                        <span className="text-md font-medium ml-2">نقش ها</span>

                        <span className="text-xs font-numeric text-gray-500 ml-auto">
                            {getCountOfCitizen() + getCountOfMafia() + " نقش"}
                        </span>

                        <ActionIcon radius={9999} variant="filled" color="red">
                            <VscAdd />
                        </ActionIcon>
                    </div>

                    <div className="text-xs flex items-center">
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
                </div>

                <Modal
                    opened={isShowSelectRoleModal}
                    onClose={() => setIsShowSelectRoleModal(false)}
                    size="md"
                    withCloseButton={false}
                    centered
                    fullScreen
                    classNames={{
                        modal: "bg-dark-500 p-4 relative h-full overflow-hidden",
                        body: "h-full",
                    }}>
                    <SelectRoles
                        handleClose={() => setIsShowSelectRoleModal(false)}
                    />
                </Modal>
            </div>

            <div className="mb-6">
                <div
                    className="bg-black bg-opacity-20 rounded-full p-4 flex items-center cursor-pointer"
                    onClick={() => setIsShowSpreadRolesModal(true)}>
                    <span className="text-md font-medium ml-2">
                        تعیین نقش ها
                    </span>

                    <span className="text-xs font-numeric text-gray-500 ml-auto">
                        {activeGame.users.length -
                            activeGame.usersRole.length +
                            " باقی مانده"}
                    </span>

                    <ActionIcon radius={9999} variant="filled" color="red">
                        <VscAdd />
                    </ActionIcon>
                </div>

                <Modal
                    opened={isShowSpreadRolesModal}
                    onClose={() => setIsShowSpreadRolesModal(false)}
                    size="md"
                    withCloseButton={false}
                    centered
                    fullScreen
                    classNames={{
                        modal: "bg-dark-500 p-4 relative h-full overflow-hidden",
                        body: "h-full",
                    }}>
                    <SpreadRoles
                        handleClose={() => setIsShowSpreadRolesModal(false)}
                    />
                </Modal>
            </div>

            <div className="text-center flex items-center">
                <Button
                    fullWidth
                    className="transition-all duration-300"
                    radius={9999}
                    disabled={
                        !activeGame.users.length ||
                        !activeGame.roles.length ||
                        !activeGame.usersRole.length
                    }
                    onClick={() => setStep("showRole")}>
                    شروع بازی
                </Button>

                <ActionIcon
                    variant="filled"
                    color="gray.6"
                    size="lg"
                    radius={9999}
                    className="mr-4"
                    onClick={() => confirmModal()}>
                    <BiTrash className="text-xl" />
                </ActionIcon>
            </div>
        </div>
    );
};

export default Init;
