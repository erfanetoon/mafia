import { useGameContext } from "@contexts/game";
import { openConfirmModal } from "@mantine/modals";
import Form from "./form";
import { useEffect } from "react";
import { useRouting } from "@contexts/routing";

const NewGameContainer = () => {
    const { activeGame, handleResetGame } = useGameContext();

    const { handleChangeRoute } = useRouting();

    const confirmModal = () =>
        openConfirmModal({
            closeOnClickOutside: false,
            classNames: {
                modal: "bg-dark-500 p-4",
            },
            centered: true,
            title: "با طراحی بازی جدید بازی طراحی شده قبلی حذف خواهد شد آیا اطمینان دارید؟",
            labels: { confirm: "بلی", cancel: "خیر" },
            cancelProps: {
                radius: 9999,
            },
            confirmProps: {
                radius: 9999,
            },
            onCancel: () => {
                handleChangeRoute(
                    activeGame?.step === "showRole" ? "showRoles" : "game",
                );
            },
            onConfirm: () => {
                handleResetGame();

                handleChangeRoute("newGame");
            },
        });

    useEffect(() => {
        if (activeGame) {
            confirmModal();
        }
    }, [activeGame]);

    return (
        <div className="w-full h-full flex flex-col items-center">
            <Form />
        </div>
    );
};

export default NewGameContainer;
