import Game from "@pages/game";
import Homepage from "@pages/index";
import Users from "@pages/users";
import { Navigate, Route, Routes } from "react-router-dom";
import RoutesInstance from "./instances";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={RoutesInstance.homepage}>
                <Route index element={<Homepage />} />
            </Route>

            <Route path={RoutesInstance.users}>
                <Route index element={<Users />} />
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
