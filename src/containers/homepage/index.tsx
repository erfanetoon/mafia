import { useGameContext } from "@contexts/game";
import { ActionIcon, Button } from "@mantine/core";
import RoutesInstance from "@routes/instances";
import { VscChevronLeft } from "react-icons/vsc";
import { Link } from "react-router-dom";

const HomepageContainer = () => {
    const { users } = useGameContext();

    return (
        <div className="py-8">
            <Link to={RoutesInstance.users} className="block mb-8">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <div className="relative shadow-md hover:shadow-lg shadow-dark-300 hover:shadow-dark-300 rounded-3xl transform scale-75 hover:scale-150 transition-all duration-300 overflow-hidden">
                    <img
                        className="w-full opacity-50"
                        src="/images/users-bg.jpg"
                        alt=""
                    />
                    <div className="absolute h-full w-full top-0 left-0 p-6">
                        <div className="flex flex-col items-center h-full w-full">
                            <div className="inline-flex items-center justify-end w-full">
                                <div className="font-numeric font-medium">
                                    {users.length + " بازیکن"}
                                </div>
                            </div>

                            <div className="inline-flex w-full items-center flex-1">
                                <div className="flex-1 ml-4">
                                    <h2 className="text-md mb-2">
                                        بازیکن های من
                                    </h2>

                                    <p className="tracking-wider">
                                        می توانید قبل از طراحی بازی جدید بازیکن
                                        های خود را اضافه کنید
                                    </p>
                                </div>

                                <div className="w-12">
                                    <ActionIcon
                                        className="mx-auto transition-all duration-300"
                                        variant="filled"
                                        color="red">
                                        <VscChevronLeft />
                                    </ActionIcon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>

            <Link to={RoutesInstance.game}>
                <Button
                    fullWidth
                    radius={24}
                    className="transition-all duration-300">
                    طراحی بازی جدید
                </Button>
            </Link>
        </div>
    );
};

export default HomepageContainer;
