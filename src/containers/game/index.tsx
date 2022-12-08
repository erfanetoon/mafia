import { ActionIcon } from "@mantine/core";
import { FC } from "react";
import { VscChevronLeft } from "react-icons/vsc";
import Components from "./components";

interface Props {
    step: TDesignGameSteps;
    setStep: Function;
}

const GameContainer: FC<Props> = ({ step, setStep }) => {
    const Component = Components[step];

    const handleBackAction = () => {
        if (step === "showRole") {
            setStep("init");
        }

        if (step === "manage") {
            // confirm modal
            // clear activeGame
            // go to init page
        }
    };

    return (
        <div>
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
