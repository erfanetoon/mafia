import { ActionIcon } from "@mantine/core";
import RoutesInstance from "@routes/instances";
import { FC, ReactNode } from "react";
import { Helmet } from "react-helmet";
import { VscChevronLeft } from "react-icons/vsc";
import { Link } from "react-router-dom";

interface Props {
    title: string;
    withHeader?: boolean;
    previousRoute?: keyof typeof RoutesInstance;
    children: ReactNode;
}

const RootLayout: FC<Props> = ({
    title,
    previousRoute,
    withHeader = false,
    children,
}) => {
    return (
        <section className="max-w-lg mx-auto py-4 px-4 md:px-0 h-screen overflow-hidden relative">
            <Helmet>
                <title>God of Mafia</title>
            </Helmet>

            <div className="flex flex-col items-center w-full h-full">
                {withHeader && (
                    <div className="pb-4 w-full">
                        <div className="flex items-center justify-between pb-4">
                            <h1 className="text-lg">{title}</h1>

                            <Link
                                to={
                                    RoutesInstance[previousRoute || "homepage"]
                                }>
                                <ActionIcon
                                    variant="filled"
                                    className="transition-all duration-300"
                                    color="red">
                                    <VscChevronLeft />
                                </ActionIcon>
                            </Link>
                        </div>

                        <div className="h-0.5 bg-gray-600 w-full rounded" />
                    </div>
                )}

                <div className="h-full overflow-auto scroll-gray-700 w-full">
                    {children}
                </div>
            </div>
        </section>
    );
};

export default RootLayout;
