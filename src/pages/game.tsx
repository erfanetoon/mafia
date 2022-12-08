import GameContainer from "@containers/game";
import RootLayout from "@layouts/root";
import { useState } from "react";

const Game = () => {
    const [step, setStep] = useState<TDesignGameSteps>("init");

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
