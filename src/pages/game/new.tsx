import NewGameContainer from "@containers/game/new";
import PageLayout from "@layouts/page";

const NewGame = () => {
    return (
        <PageLayout
            root={{
                title: "بازی جدید",
            }}
            previousRoute="homepage"
            title="بازی جدید">
            <NewGameContainer />
        </PageLayout>
    );
};

export default NewGame;
