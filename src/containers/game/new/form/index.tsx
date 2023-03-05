import { ActionIcon, Button, Select } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { BiCheck, BiX } from "react-icons/bi";
import { Range } from "react-range";
import { VscClearAll } from "react-icons/vsc";
import { useGameContext } from "@contexts/game";
import Role from "../role";
import { Games, Roles } from "../settings";
import { useRouting } from "@contexts/routing";

const Form = () => {
    const [formData, setFormData] = useState<{
        game: TGames | null;
        players: number;
        roles: Array<IRole & { count: number }>;
    }>({
        game: null,
        players: 0,
        roles: [],
    });
    const [isValid, setIsValid] = useState(false);

    const { handleStartGame } = useGameContext();

    const { handleChangeRoute } = useRouting();

    const { min, max } = useMemo(() => {
        if (!formData.game) {
            return {
                min: 0,
                max: 1,
            };
        }

        if (formData.game === "advanced") {
            return {
                min: 15,
                max: 42,
            };
        }

        let min = 0,
            max = 0;

        Roles[formData.game].forEach((item) => {
            min = min + (item?.min || 0);
            max = max + (item?.max || 0);
        });

        return {
            min,
            max,
        };
    }, [formData.game]);

    useEffect(() => {
        if (formData.players <= max && formData.players >= min) {
            return undefined;
        }

        setFormData({
            ...formData,
            players: min,
        });
    }, [min, max]);

    useEffect(() => {
        if (!formData.game) {
            setIsValid(false);
            return undefined;
        }

        if (
            formData.game === "advanced" &&
            (!formData.roles.length ||
                formData.roles.length !== formData.players)
        ) {
            setIsValid(false);
            return undefined;
        }

        setIsValid(true);
    }, [formData]);

    const handleStart = () => {
        if (!formData.game) {
            return null;
        }

        if (formData.game !== "advanced") {
            let mafiaCount = Math.floor(formData.players / 3),
                citizenCount = formData.players - mafiaCount;

            let roles: Array<IRole & { count: number }> = [];
            let i = 0;

            while (i < Roles[formData.game].length) {
                const { title, type, max, min } = Roles[formData.game][i];
                const extra = type === "citizen" ? citizenCount : mafiaCount;
                i++;

                if (type === "citizen" && !citizenCount) {
                    continue;
                }

                if (type === "mafia" && !mafiaCount) {
                    continue;
                }

                roles.push({
                    count: (max || 0) - (min || 0) > 0 ? extra : 1,
                    title: title,
                    type: type,
                });

                type === "citizen"
                    ? (citizenCount =
                          citizenCount -
                          ((max || 0) - (min || 0) > 0 ? extra : 1))
                    : (mafiaCount =
                          mafiaCount -
                          ((max || 0) - (min || 0) > 0 ? extra : 1));
            }

            handleStartGame({
                roles: roles,
                step: "showRole",
                players: formData.players,
                type: formData.game,
                usersRole: [],
                isEnterName: false,
                askEnterName: false,
            });

            handleChangeRoute("showRoles");

            return null;
        }

        handleStartGame({
            roles: formData.roles,
            step: "showRole",
            players: formData.players,
            type: formData.game,
            usersRole: [],
            isEnterName: false,
            askEnterName: false,
        });

        handleChangeRoute("showRoles");
    };

    return (
        <>
            <div className="mb-12 flex items-end w-full">
                <div className="flex-1">
                    <Select
                        label="سبک بازی"
                        variant="filled"
                        placeholder="انتخاب کنید"
                        radius={9999}
                        value={formData.game}
                        classNames={{
                            label: "mb-1 text-xs",
                            input: "bg-gray-700 placeholder:text-gray-600 border-gray-700 rounded",
                            dropdown: "bg-gray-700",
                        }}
                        onChange={(value) =>
                            setFormData({
                                ...formData,
                                game: value as TGames | null,
                            })
                        }
                        data={Games.map((item) => ({
                            label: item.label,
                            value: item.value,
                        }))}
                    />
                </div>

                <div
                    className={classNames(
                        "mr-4 border w-7 h-7 rounded-full inline-flex items-center justify-center mb-1",
                        formData.game ? "bg-green-600" : "bg-red-600",
                    )}>
                    {formData.game ? (
                        <BiCheck className="text-2xl" />
                    ) : (
                        <BiX className="text-2xl" />
                    )}
                </div>
            </div>

            <div className="w-full">
                <div className="flex items-center justify-between mb-2">
                    <label htmlFor="" className="inline-block text-gray-400">
                        تعداد نفرات
                    </label>

                    <div className="font-numeric font-bold text-lg text-red-500">
                        {formData.players + " نفر"}
                    </div>
                </div>

                <div className="direction-ltr ltr px-3">
                    <Range
                        step={1}
                        min={min}
                        max={max}
                        values={[formData.players]}
                        onChange={(values: any) =>
                            setFormData({ ...formData, players: values[0] })
                        }
                        renderTrack={({ props, children }: any) => (
                            <div {...props} className="bg-gray-700 h-2 rounded">
                                {children}
                            </div>
                        )}
                        renderThumb={({ props }: any) => (
                            <div
                                {...props}
                                className="w-4 h-4 rounded-full bg-red-500"></div>
                        )}
                    />
                </div>
            </div>

            {formData.game === "advanced" && (
                <div className="mt-12 w-full">
                    <Role formData={formData} setFormData={setFormData} />
                </div>
            )}

            <div className="mt-auto inline-flex items-center justify-center w-full py-1">
                <Button
                    disabled={!isValid}
                    className="flex-1 transition-all duration-300"
                    onClick={handleStart}>
                    شروع بازی
                </Button>

                <ActionIcon
                    variant="filled"
                    color="gray.6"
                    size="lg"
                    className="mr-2 transition-all duration-300"
                    onClick={() =>
                        setFormData({
                            game: null,
                            players: 0,
                            roles: [],
                        })
                    }>
                    <VscClearAll />
                </ActionIcon>
            </div>
        </>
    );
};

export default Form;
