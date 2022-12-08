import { useGameContext } from "@contexts/game";
import { DefaultValue } from "@contexts/game/settings";
import { ActionIcon } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { FC } from "react";
import { VscChevronLeft } from "react-icons/vsc";
import Components from "./components";

interface Props {
    step: TDesignGameSteps;
    setStep: Function;
}

const GameContainer: FC<Props> = ({ step, setStep }) => {
    const Component = Components[step];

    const { handleChangeActiveGame } = useGameContext();

    const confirmModal = () =>
        openConfirmModal({
            classNames: {
                modal: "bg-dark-500 p-4",
            },
            centered: true,
            title: "از خارج شدن از محیط بازی اطمینان دارید ؟ تمامی اطلاعات پاک میشود",
            labels: { confirm: "خروج", cancel: "انصراف" },
            cancelProps: {
                radius: 9999,
            },
            confirmProps: {
                radius: 9999,
            },
            onCancel: () => {},
            onConfirm: () => {
                handleChangeActiveGame(DefaultValue.activeGame);
                setStep("init");
            },
        });

    const handleBackAction = () => {
        if (step === "showRole") {
            setStep("init");
        }

        if (step === "manage") {
            confirmModal();
            // clear activeGame
            // go to init page
        }
    };

    return (
        <div className="flex flex-col items-center w-full h-full">
            {step !== "init" && (
                <div className="pb-4 w-full">
                    <div className="flex items-center justify-between pb-4">
                        <h1 className="text-lg">مشاهده نقش ها</h1>

                        <ActionIcon
                            variant="filled"
                            className="transition-all duration-300"
                            color="red"
                            onClick={() => handleBackAction()}>
                            <VscChevronLeft />
                        </ActionIcon>
                    </div>

                    <div className="h-0.5 bg-gray-600 w-full rounded" />
                </div>
            )}

            <Component setStep={setStep} />
        </div>
    );
};

export default GameContainer;
