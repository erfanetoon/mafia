import { useGameContext } from "@contexts/game";
import { ActionIcon, Modal } from "@mantine/core";
import classNames from "classnames";
import { VscClose, VscTrash } from "react-icons/vsc";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useState } from "react";
import Add from "./add";
import { openConfirmModal } from "@mantine/modals";

const UsersContainer = () => {
    const [isShowAddModal, setIsShowAddModal] = useState(false);

    const { users, handleRemoveUser } = useGameContext();

    const confirmModal = (id: number) =>
        openConfirmModal({
            classNames: {
                modal: "bg-dark-500 p-4",
            },
            centered: true,
            title: "از حذف آیتم انتخابی اطمینان دارید ؟",
            labels: { confirm: "حذف", cancel: "انصراف" },
            cancelProps: {
                radius: 9999,
            },
            confirmProps: {
                radius: 9999,
            },
            onCancel: () => {},
            onConfirm: () => handleRemoveUser(id),
        });

    return (
        <div>
            <ActionIcon
                className="transition-all duration-300 absolute bottom-4 right-4"
                variant="filled"
                radius={9999}
                color="red"
                size="xl"
                onClick={() => setIsShowAddModal(true)}>
                <AiOutlineUserAdd className="text-2xl" />
            </ActionIcon>
            {users.map((item, i) => (
                <div
                    key={i}
                    className={classNames(
                        "flex items-center",
                        i + 1 > users.length ? "" : "mb-2",
                    )}>
                    <img
                        className="h-12 w-12 border-2 border-solid border-white rounded-full shadow ml-4"
                        src={item.avatar}
                        alt=""
                    />

                    <span className="ml-auto text-md font-medium">
                        {item.name}
                    </span>

                    <ActionIcon
                        variant="subtle"
                        color="red"
                        size="lg"
                        onClick={() => confirmModal(item.id)}>
                        <VscTrash />
                    </ActionIcon>
                </div>
            ))}

            {!users.length && (
                <div className="text-center text-lg font-medium py-8">
                    موردی یافت نشد
                </div>
            )}

            <Modal
                opened={isShowAddModal}
                onClose={() => setIsShowAddModal(false)}
                size="md"
                withCloseButton={false}
                centered
                classNames={{
                    modal: "bg-dark-500 p-8",
                }}>
                <Add handleClose={() => setIsShowAddModal(false)} />
            </Modal>
        </div>
    );
};

export default UsersContainer;
