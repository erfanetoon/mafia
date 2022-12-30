export const Games: Array<{ label: string; value: TGames }> = [
    {
        label: "بازپرس",
        value: "investigator",
    },
    {
        label: "تفنگدار",
        value: "rifleman",
    },
    {
        label: "ساقی",
        value: "bartender",
    },
    {
        label: "فیلیمو",
        value: "filimo",
    },
];

export const Roles: Record<TGames, Array<IRole>> = {
    investigator: [
        {
            title: "پدرخوانده",
            type: "mafia",
        },
        {
            title: "ناتو",
            type: "mafia",
        },
        {
            title: "شیاد",
            type: "mafia",
        },
        {
            title: "مافیا ساده",
            type: "mafia",
        },
        {
            title: "دکتر",
            type: "citizen",
        },
        {
            title: "حرفه ای",
            type: "citizen",
        },
        {
            title: "کارآگاه",
            type: "citizen",
        },
        {
            title: "رویین تن",
            type: "citizen",
        },
        {
            title: "بازپرس",
            type: "citizen",
        },
        {
            title: "هانتر",
            type: "citizen",
        },
        {
            title: "شهروند ساده",
            type: "citizen",
        },
    ],
    bartender: [
        {
            title: "پدرخوانده",
            type: "mafia",
        },
        {
            title: "ناتو",
            type: "mafia",
        },
        {
            title: "دکتر لکتر",
            type: "mafia",
        },
        {
            title: "مافیا ساده",
            type: "mafia",
        },
        {
            title: "دکتر",
            type: "citizen",
        },
        {
            title: "حرفه ای",
            type: "citizen",
        },
        {
            title: "کارآگاه",
            type: "citizen",
        },
        {
            title: "جان سخت",
            type: "citizen",
        },
        {
            title: "ساقی",
            type: "citizen",
        },
        {
            title: "شهروند ساده",
            type: "citizen",
        },
    ],
    filimo: [
        {
            title: "پدرخوانده",
            type: "mafia",
        },
        {
            title: "دکتر لکتر",
            type: "mafia",
        },
        {
            title: "جوکر",
            type: "mafia",
        },
        {
            title: "مافیا ساده",
            type: "mafia",
        },
        {
            title: "دکتر",
            type: "citizen",
        },
        {
            title: "حرفه ای",
            type: "citizen",
        },
        {
            title: "کارآگاه",
            type: "citizen",
        },
        {
            title: "جان سخت",
            type: "citizen",
        },
        {
            title: "روانپزشک",
            type: "citizen",
        },
        {
            title: "شهردار",
            type: "citizen",
        },
        {
            title: "شهروند ساده",
            type: "citizen",
        },
    ],
    rifleman: [
        {
            title: "پدرخوانده",
            type: "mafia",
        },
        {
            title: "ناتو",
            type: "mafia",
        },
        {
            title: "گروگانگیر",
            type: "mafia",
        },
        {
            title: "مافیا ساده",
            type: "mafia",
        },
        {
            title: "دکتر",
            type: "citizen",
        },
        {
            title: "نگهبان",
            type: "citizen",
        },
        {
            title: "کارآگاه",
            type: "citizen",
        },
        {
            title: "تکاور",
            type: "citizen",
        },
        {
            title: "تفنگدار",
            type: "citizen",
        },
        {
            title: "شهروند ساده",
            type: "citizen",
        },
    ],
};
