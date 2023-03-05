import { useRouting } from "@contexts/routing";
import RootLayout from "@layouts/root";
import { ActionIcon } from "@mantine/core";
import { FC, ReactNode } from "react";
import { BiChevronLeft } from "react-icons/bi";

interface Props {
    root: {
        title: string;
    };
    title: string;
    previousRoute?: TRoutes;
    children: ReactNode;
}

const PageLayout: FC<Props> = ({ root, title, previousRoute, children }) => {
    const { handleChangeRoute } = useRouting();

    return (
        <RootLayout title={root.title}>
            <div className="h-full flex flex-col overflow-hidden">
                <div className="w-full">
                    <div className="flex items-center justify-between">
                        <h1 className="text-md font-medium">{title}</h1>

                        {!!previousRoute && (
                            <ActionIcon
                                size="md"
                                variant="filled"
                                color="red"
                                className="transition-all duration-300"
                                onClick={() =>
                                    handleChangeRoute(previousRoute)
                                }>
                                <BiChevronLeft className="text-xl" />
                            </ActionIcon>
                        )}
                    </div>

                    <div className="bg-gray-500 rounded-full h-0.5 w-full my-2" />
                </div>

                <div className="flex-1 w-full overflow-auto scroll-gray-700">
                    {children}
                </div>
            </div>
        </RootLayout>
    );
};

export default PageLayout;
