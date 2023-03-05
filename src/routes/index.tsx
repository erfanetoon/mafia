import { useRouting } from "@contexts/routing";
import { RoutesComponent } from "@contexts/routing/settings";

const Routes = () => {
    const { route } = useRouting();

    const Component = RoutesComponent[route];

    console.log(route);
    return <Component />;
};

export default Routes;
