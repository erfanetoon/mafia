import GameContainer from "@containers/game";
import { useGameContext } from "@contexts/game";
import RootLayout from "@layouts/root";
import { useEffect, useState } from "react";

const Game = () => {
    const [step, setStep] = useState<TDesignGameSteps>("init");

    const { activeGame } = useGameContext();

    useEffect(() => {
        if (!activeGame.step) {
            return undefined;
        }

        setStep(activeGame.step);
    }, [activeGame.step]);

    return (
        <RootLayout
            title="طراحی بازی"
            previousRoute="homepage"
            withHeader={step === "init"}>
            <GameContainer step={step} setStep={setStep} />
        </RootLayout>
    );
};

export default Game;
