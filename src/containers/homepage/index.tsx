import SiteLoading from "@components/loadings/siteLoading";
import { useGameContext } from "@contexts/game";
import { Button } from "@mantine/core";
import RoutesInstance from "@routes/instances";
import { Link } from "react-router-dom";

const HomepageContainer = () => {
    const { activeGame, loading } = useGameContext();

    return (
        <div className="h-full">
            <div className="flex flex-col items-center w-full h-full">
                <img className="w-full" src="/images/icon.png" alt="" />
                <div className="mt-auto w-full">
                    {loading && <SiteLoading />}

                    {!loading && (
                        <>
                            <Link
                                to={RoutesInstance.newGame}
                                className="rounded-full block">
                                <Button
                                    fullWidth
                                    radius={24}
                                    color="red"
                                    className="transition-all duration-300 mb-4">
                                    طراحی بازی جدید
                                </Button>
                            </Link>

                            {!!activeGame && (
                                <Link
                                    to={
                                        activeGame?.step === "showRole"
                                            ? RoutesInstance.showRoles
                                            : RoutesInstance.game
                                    }
                                    className="rounded-full block">
                                    <Button
                                        fullWidth
                                        radius={24}
                                        color="gray.6"
                                        className="transition-all duration-300">
                                        ادامه بازی قبلی
                                    </Button>
                                </Link>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomepageContainer;
