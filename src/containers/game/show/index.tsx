import SiteLoading from "@components/loadings/siteLoading";
import { useGameContext } from "@contexts/game";
import { Button, Modal } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import RoutesInstance from "@routes/instances";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowDetails from "./showDetails";

const ShowRolesContainer = () => {
    const [loading, setLoading] = useState(true);
    const [isShowModal, setIsShowModal] = useState(false);
    const [activeItem, setActiveItem] = useState<number | null>(null);
    const [seen, setSeen] = useState<Array<number>>([]);

    const Navigate = useNavigate();

    const { activeGame, handleActiveGame } = useGameContext();

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
                    handleActiveGame({
                        ...activeGame,
                        step: "manage",
                    });

                Navigate(RoutesInstance.game);
            },
        });

    useEffect(() => {
        handleSpreadRoles();
    }, []);

    const handleSpreadRoles = () => {
        if (!activeGame) {
            Navigate(RoutesInstance.homepage);

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

        handleActiveGame({
            ...activeGame,
            usersRole: usersRoles.sort(function (a, b) {
                return a.user.id - b.user.id;
            }),
        });

        setTimeout(() => {
            setLoading(false);
        }, 2000);
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
                        <div className="grid grid-cols-3 gap-3">
                            {activeGame.usersRole.map(
                                (item, i) =>
                                    !seen.includes(i) && (
                                        <div
                                            key={i}
                                            className={classNames(
                                                "text-center p-2 transition-all duration-300 rounded-3xl cursor-pointer bg-white bg-opacity-20",
                                            )}
                                            onClick={() => {
                                                setActiveItem(i);
                                                setIsShowModal(true);
                                            }}>
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
                            onClick={() => {
                                if (
                                    seen.length === activeGame.usersRole.length
                                ) {
                                    activeGame &&
                                        handleActiveGame({
                                            ...activeGame,
                                            step: "manage",
                                        });

                                    Navigate(RoutesInstance.game);
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
