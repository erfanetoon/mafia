import { useGameContext } from "@contexts/game";
import { ActionIcon, Button } from "@mantine/core";
import RoutesInstance from "@routes/instances";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { VscCheck } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const GameContainer = () => {
    const [isShowRole, setIsShowRole] = useState(false);

    const { activeGame } = useGameContext();

    const Navigate = useNavigate();

    useEffect(() => {
        if (!activeGame) {
            Navigate(RoutesInstance.homepage);
        }
    }, []);

    return (
        <>
            <div className="flex items-center w-full mb-4">
                <Button
                    size="sm"
                    variant={isShowRole ? "filled" : "subtle"}
                    color="blue"
                    radius={9999}
                    onClick={() => {
                        setIsShowRole(!isShowRole);
                    }}>
                    مشاهده نقش ها
                </Button>
            </div>

            <div className="h-full w-full overflow-auto scroll-gray-700">
                <div className="grid grid-cols-3 gap-4">
                    {activeGame?.usersRole.map((item, i) => (
                        <div
                            key={i}
                            className={classNames(
                                "text-center transition-all duration-300 rounded-3xl cursor-pointer ",
                            )}>
                            <div className="h-10 w-10 mx-auto mb-2 relative">
                                {isShowRole && (
                                    <div className="bg-black bg-opacity-30 w-full h-full absolute top-0 rounded-full flex items-center justify-center">
                                        <ActionIcon
                                            variant="filled"
                                            color={
                                                item.role.type === "citizen"
                                                    ? "blue"
                                                    : "red"
                                            }
                                            radius={9999}>
                                            <VscCheck />
                                        </ActionIcon>
                                    </div>
                                )}
                            </div>

                            <div className="font-medium mb-1">
                                {item.user.name}
                            </div>

                            {isShowRole && (
                                <div
                                    className={classNames(
                                        "text-xs text-white rounded-full py-0.5",
                                        item.role.type === "mafia"
                                            ? "bg-red-700"
                                            : "bg-blue-700",
                                    )}>
                                    {item.role.title}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default GameContainer;
