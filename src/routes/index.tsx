import Homepage from "@pages/index";
import { Navigate, Route, Routes } from "react-router-dom";
import RoutesInstance from "./instances";
import NewGame from "@pages/game/new";
import Show from "@pages/game/show";
import Game from "@pages/game";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={RoutesInstance.homepage}>
                <Route index element={<Homepage />} />
            </Route>

            <Route path={RoutesInstance.newGame}>
                <Route index element={<NewGame />} />
            </Route>

            <Route path={RoutesInstance.showRoles}>
                <Route index element={<Show />} />
            </Route>

            <Route path={RoutesInstance.game}>
                <Route index element={<Game />} />
            </Route>

            <Route
                path="*"
                element={<Navigate to={RoutesInstance.homepage} replace />}
            />
        </Routes>
    );
};

export default AppRoutes;
