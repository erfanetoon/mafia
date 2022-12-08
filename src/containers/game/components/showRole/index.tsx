import { useGameContext } from "@contexts/game";
import { Button, Modal } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import classNames from "classnames";
import { FC } from "react";
import { useState } from "react";
import { IComponentProps } from "../types";
import ShowDetails from "./showDetails";

const ShowRole: FC<IComponentProps> = ({ setStep }) => {
    const [isShowModal, setIsShowModal] = useState(false);
    const [activeItem, setActiveItem] = useState<number | null>(null);
    const [seen, setSeen] = useState<Array<number>>([]);

    const { activeGame } = useGameContext();

    const confirmModal = () =>
        openConfirmModal({
            classNames: {
                modal: "bg-dark-500 p-4",
            },
            centered: true,
            title: "تمامی بازیکنان نقش های خود را ندیده اند، از رفتن به مرحله بعد اطمینان دارید ؟",
            labels: { confirm: "بلی", cancel: "خیر" },
            cancelProps: {
                radius: 9999,
            },
            confirmProps: {
                radius: 9999,
            },
            onCancel: () => {},
            onConfirm: () => setStep("manage"),
        });

    return (
        <>
            <div className="h-full overflow-auto scroll-gray-700 w-full px-1">
                <div className="grid grid-cols-3 gap-3">
                    {activeGame.usersRole.map(
                        (item, i) =>
                            !seen.includes(i) && (
                                <div
                                    key={i}
                                    className={classNames(
                                        "text-center p-2 transition-all duration-300 rounded-3xl cursor-pointer bg-white bg-opacity-5",
                                    )}
                                    onClick={() => {
                                        setActiveItem(i);
                                        setIsShowModal(true);
                                    }}>
                                    <div className="h-10 w-10 mx-auto mb-2 relative">
                                        <img
                                            className="mx-auto h-10 w-10 border-2 border-solid border-white rounded-full shadow block"
                                            src={item.user.avatar}
                                            alt=""
                                        />
                                    </div>

                                    <span className="font-medium">
                                        {item.user.name}
                                    </span>
                                </div>
                            ),
                    )}

                    <Modal
                        opened={isShowModal}
                        onClose={() => setIsShowModal(false)}
                        size="md"
                        centered
                        withCloseButton={false}
                        closeOnClickOutside={false}
                        closeOnEscape={false}
                        classNames={{
                            modal: "bg-dark-500 p-2",
                            body: "h-full",
                        }}>
                        <ShowDetails
                            data={
                                activeItem !== null
                                    ? activeGame.usersRole[activeItem]
                                    : null
                            }
                            handleClose={() => {
                                setIsShowModal(false);

                                if (activeItem !== null) {
                                    setSeen((oldState) => [
                                        ...oldState,
                                        activeItem,
                                    ]);

                                    setActiveItem(null);
                                }
                            }}
                        />
                    </Modal>
                </div>
            </div>

            <div className="w-full">
                <Button
                    variant="filled"
                    radius={9999}
                    fullWidth
                    onClick={() =>
                        seen.length === activeGame.usersRole.length
                            ? setStep("manage")
                            : confirmModal()
                    }>
                    مدیریت بازی
                </Button>
            </div>
        </>
    );
};

export default ShowRole;
