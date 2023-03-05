import SiteLoading from "@components/loadings/siteLoading";
import { useGameContext } from "@contexts/game";
import { Button, Modal } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { useEffect, useState } from "react";
import ShowDetails from "./showDetails";
import { useRouting } from "@contexts/routing";

const ShowRolesContainer = () => {
    const [loading, setLoading] = useState(true);
    const [isShowModal, setIsShowModal] = useState(false);
    const [activeItem, setActiveItem] = useState<number | null>(null);
    const [seen, setSeen] = useState<Array<number>>([]);

    const { activeGame, handleChangeGame, handleSetEnterName } =
        useGameContext();

    const { handleChangeRoute } = useRouting();

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
            onConfirm: () => {
                activeGame &&
                    handleChangeGame({
                        step: "manage",
                    });

                handleChangeRoute("game");
            },
        });

    const confirmModalForInputName = () =>
        openConfirmModal({
            classNames: {
                modal: "bg-dark-500 p-4",
            },
            closeOnClickOutside: false,
            centered: true,
            title: "آیا مایل هستید پس از مشاهده نقش هر بازیکن نام آن بازیکن را وارد نمایید؟",
            labels: { confirm: "بلی", cancel: "خیر" },
            cancelProps: {
                radius: 9999,
            },
            confirmProps: {
                radius: 9999,
            },

            onCancel: () => {
                activeGame && handleSetEnterName(false);

                handleSpreadRoles();
            },
            onConfirm: () => {
                activeGame && handleSetEnterName(true);

                handleSpreadRoles();
            },
        });

    useEffect(() => {
        if (!activeGame) {
            handleChangeRoute("homepage");

            return undefined;
        }

        if (activeGame.askEnterName) {
            handleSpreadRoles();
        } else {
            confirmModalForInputName();
        }
    }, []);

    const handleSpreadRoles = () => {
        if (!activeGame) {
            handleChangeRoute("homepage");

            return undefined;
        }

        if (activeGame.usersRole.length) {
            setTimeout(() => {
                setLoading(false);
            }, 1000);

            return undefined;
        }

        const usersRoles: Array<{ user: IUser; role: IRole }> = [];
        let roles = [...activeGame?.roles];
        let i = 0;

        while (i < roles.length) {
            const { count, title, type } = roles[i];

            if (count > 1) {
                let j = 0;

                while (j < count) {
                    usersRoles.push({
                        role: {
                            title,
                            type,
                        },
                        user: {
                            id: Math.random() * 100,
                            name: "*",
                        },
                    });
                    j++;
                }
            } else {
                usersRoles.push({
                    role: {
                        title,
                        type,
                    },
                    user: {
                        id: Math.random() * 100,
                        name: "*",
                    },
                });
            }

            i++;
        }

        handleChangeGame({
            usersRole: usersRoles.sort(function (a, b) {
                return a.user.id - b.user.id;
            }),
        });

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="h-full">
            {loading && (
                <div className="flex items-center justify-center py-8">
                    <SiteLoading size="5xl" />
                </div>
            )}

            {!loading && activeGame && (
                <div className="h-full flex flex-col">
                    <div className="h-full overflow-auto scroll-gray-700 w-full px-1 mb-4">
                        <div className="grid grid-cols-4 gap-2">
                            {activeGame.usersRole.map(
                                (item, i) =>
                                    !seen.includes(i) && (
                                        <div
                                            key={i}
                                            className="flex flex-col items-center"
                                            onClick={() => {
                                                setActiveItem(i);
                                                setIsShowModal(true);
                                            }}>
                                            <div
                                                key={i}
                                                className="p-0.5 border border-solid border-white rounded-full overflow-hidden w-[90%] mb-1">
                                                <div className="p-2 bg-white rounded-full">
                                                    <img
                                                        src="/images/icon.png"
                                                        className="w-full"
                                                        alt=""
                                                    />
                                                </div>
                                            </div>

                                            <div className="text-center">
                                                {item.user.name}
                                            </div>
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
                                    modal: "bg-dark-500 p-4",
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

                    <div className="w-full py-1">
                        <Button
                            variant="filled"
                            radius={9999}
                            fullWidth
                            onClick={() => {
                                if (
                                    seen.length === activeGame.usersRole.length
                                ) {
                                    activeGame &&
                                        handleChangeGame({
                                            step: "manage",
                                            usersRole: seen.map(
                                                (item) =>
                                                    activeGame.usersRole[item],
                                            ),
                                        });

                                    handleChangeRoute("game");
                                } else {
                                    confirmModal();
                                }
                            }}>
                            مدیریت بازی
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowRolesContainer;
