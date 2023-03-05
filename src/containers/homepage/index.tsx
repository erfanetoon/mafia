import SiteLoading from "@components/loadings/siteLoading";
import { useGameContext } from "@contexts/game";
import { useRouting } from "@contexts/routing";
import { Button } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";

const HomepageContainer = () => {
    const { activeGame, loading, handleResetGame } = useGameContext();

    const { handleChangeRoute } = useRouting();

    const confirmModal = () =>
        openConfirmModal({
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
            onCancel: () => {},
            onConfirm: () => {
                handleResetGame();

                handleChangeRoute("newGame");
            },
        });

    return (
        <div className="h-full">
            <div className="flex flex-col items-center w-full h-full overflow-auto scroll-gray-700">
                <img className="w-full" src="/images/icon.png" alt="" />

                <div className="mt-auto w-full">
                    {loading && <SiteLoading />}

                    {!loading && (
                        <>
                            <Button
                                fullWidth
                                radius={24}
                                color="red"
                                className="transition-all duration-300 mb-4"
                                onClick={() =>
                                    activeGame
                                        ? confirmModal()
                                        : handleChangeRoute("newGame")
                                }>
                                طراحی بازی جدید
                            </Button>

                            {!!activeGame && (
                                <Button
                                    fullWidth
                                    radius={24}
                                    color="gray.6"
                                    className="transition-all duration-300"
                                    onClick={() =>
                                        handleChangeRoute(
                                            activeGame.step === "showRole"
                                                ? "showRoles"
                                                : "game",
                                        )
                                    }>
                                    ادامه بازی قبلی
                                </Button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomepageContainer;
