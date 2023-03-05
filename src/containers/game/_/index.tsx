import { useGameContext } from "@contexts/game";
import { useRouting } from "@contexts/routing";
import { Button } from "@mantine/core";
import { useState } from "react";

const GameContainer = () => {
    const [isShowRole, setIsShowRole] = useState(false);

    const { activeGame } = useGameContext();

    const { handleChangeRoute } = useRouting();

    return (
        <div className="h-full flex flex-col overflow-hidden">
            <div className="h-full w-full overflow-auto scroll-gray-700 p-2">
                <div className="grid grid-cols-3 gap-2">
                    {activeGame?.usersRole.map((item, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center bg-dark-600 rounded-lg p-1">
                            <div className="p-0.5 border border-solid border-white rounded-full overflow-hidden w-[70%] mb-1">
                                <div className="p-2 bg-white rounded-full">
                                    <img
                                        src="/images/icon.png"
                                        className="w-full"
                                        alt=""
                                    />
                                </div>
                            </div>

                            <div className="text-center">{item.user.name}</div>

                            {isShowRole && (
                                <div className="text-xs bg-white text-black w-full rounded-lg p-2 font-bold text-center">
                                    {item.role.title}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center w-full py-2">
                <Button
                    size="xs"
                    variant={isShowRole ? "filled" : "subtle"}
                    color="blue"
                    radius={9999}
                    className="w-1/2 mx-1"
                    onClick={() => {
                        setIsShowRole(!isShowRole);
                    }}>
                    نمایش نقش ها
                </Button>

                <Button
                    size="xs"
                    variant="filled"
                    color="red"
                    className="w-1/2 mx-1"
                    radius={9999}
                    onClick={() => {
                        handleChangeRoute("showRoles");
                    }}>
                    مشاهده مجدد نقش ها
                </Button>
            </div>
        </div>
    );
};

export default GameContainer;
