export interface RoutingContext {
    route: TRoutes;
    handleChangeRoute: (route: TRoutes) => void;
}
