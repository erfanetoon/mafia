import { FC, ReactNode } from "react";
import { Helmet } from "react-helmet";

interface Props {
    title: string;
    children: ReactNode;
}

const RootLayout: FC<Props> = ({ title, children }) => {
    return (
        <section className="max-w-lg mx-auto p-8 h-screen overflow-hidden relative">
            <Helmet>
                <title>{title}</title>
            </Helmet>

            {children}
        </section>
    );
};

export default RootLayout;
