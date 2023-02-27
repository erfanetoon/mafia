import NewGameContainer from "@containers/game/new";
import RootLayout from "@layouts/root";

const NewGame = () => {
    return (
        <RootLayout title="طراحی بازی جدید">
            <NewGameContainer />
        </RootLayout>
    );
};

export default NewGame;
