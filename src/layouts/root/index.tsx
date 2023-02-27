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

const RootLayout: FC<Props> = ({ children }) => {
    return (
        <section className="max-w-lg mx-auto p-8 md:px-0 h-screen overflow-hidden relative">
            <Helmet>
                <title>God of Mafia</title>
            </Helmet>

            {children}
        </section>
    );
};

export default RootLayout;
