import GameContainer from "@containers/game/_";
import PageLayout from "@layouts/page";

const Game = () => {
    return (
        <PageLayout
            root={{
                title: "صفحه بازی",
            }}
            previousRoute="homepage"
            title="صفحه بازی">
            <GameContainer />
        </PageLayout>
    );
};

export default Game;
