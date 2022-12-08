import { GameContext } from "@contexts/game/types";
import { ActionIcon, Button } from "@mantine/core";
import classNames from "classnames";
import { FC } from "react";
import { VscCheck } from "react-icons/vsc";
interface Props {
    data: GameContext["activeGame"]["usersRole"][0] | null;
    handleClose: Function;
}

const ShowDetails: FC<Props> = ({ data, handleClose }) => {
    return (
        <div>
            <div
                className={classNames(
                    "text-center transition-all duration-300 rounded-3xl cursor-pointer",
                )}>
                <div className="h-10 w-10 mx-auto mb-2 relative">
                    <img
                        className="mx-auto h-10 w-10 border-2 border-solid border-white rounded-full shadow block"
                        src={data?.user.avatar}
                        alt=""
                    />

                    <div className="bg-black bg-opacity-30 w-full h-full absolute top-0 rounded-full flex items-center justify-center">
                        <ActionIcon
                            variant="filled"
                            color={
                                data?.role.type === "citizen" ? "blue" : "red"
                            }
                            radius={9999}>
                            <VscCheck />
                        </ActionIcon>
                    </div>
                </div>

                <div className="font-bold text-white mb-2">
                    {data?.user.name}
                </div>

                <div
                    className={classNames(
                        "text-white rounded-full inline-block px-8 py-4 font-bold text-xl",
                        data?.role.type === "mafia"
                            ? "bg-red-700"
                            : "bg-blue-700",
                    )}>
                    {data?.role.title}
                </div>

                <div className="mt-10">
                    <Button
                        variant="filled"
                        color="yellow.6"
                        size="sm"
                        fullWidth
                        radius={9999}
                        onClick={() => handleClose()}>
                        متوجه شدم
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ShowDetails;
