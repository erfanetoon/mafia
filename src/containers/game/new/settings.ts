export const Games: Array<{ label: string; value: TGames }> = [
    {
        label: "پیشرفته",
        value: "advanced",
    },
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
    advanced: [
        {
            title: "پدرخوانده",
            type: "mafia",
        },
        {
            title: "ناتو",
            type: "mafia",
        },
        {
            title: "دکتر مافیا",
            type: "mafia",
        },
        {
            title: "معشوقه",
            type: "mafia",
        },
        {
            title: "ناتاشا",
            type: "mafia",
        },
        {
            title: "دزد",
            type: "mafia",
        },
        {
            title: "خرابکار",
            type: "mafia",
        },
        {
            title: "افسونگر",
            type: "mafia",
        },
        {
            title: "تروریست",
            type: "mafia",
        },
        {
            title: "وکیل",
            type: "mafia",
        },
        {
            title: "جاسوس",
            type: "mafia",
        },
        {
            title: "مرد قوی",
            type: "mafia",
        },
        {
            title: "شیاد",
            type: "mafia",
        },
        {
            title: "سایلنسر",
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
            title: "اسنایپر",
            type: "citizen",
        },
        {
            title: "تک تیرانداز",
            type: "citizen",
        },
        {
            title: "حرفه ای",
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
            title: "کارآگاه",
            type: "citizen",
        },
        {
            title: "آهنگر",
            type: "citizen",
        },
        {
            title: "جان سخت",
            type: "citizen",
        },
        {
            title: "زره پوش",
            type: "citizen",
        },
        {
            title: "رویین تن",
            type: "citizen",
        },
        {
            title: "روانشناس",
            type: "citizen",
        },
        {
            title: "بمبر",
            type: "citizen",
        },
        {
            title: "فدایی",
            type: "citizen",
        },
        {
            title: "گورکن",
            type: "citizen",
        },
        {
            title: "کلانتر",
            type: "citizen",
        },
        {
            title: "ساقی",
            type: "citizen",
        },
        {
            title: "فرمانده",
            type: "citizen",
        },
        {
            title: "کابوی",
            type: "citizen",
        },
        {
            title: "تایلر",
            type: "citizen",
        },
        {
            title: "فراماسون",
            type: "citizen",
        },
        {
            title: "شهردار",
            type: "citizen",
        },
        {
            title: "قاضی",
            type: "citizen",
        },
        {
            title: "کشیش",
            type: "citizen",
        },
        {
            title: "محافظ",
            type: "citizen",
        },
        {
            title: "شهروند ساده",
            type: "citizen",
        },
    ],
    investigator: [
        {
            title: "پدرخوانده",
            type: "mafia",
            min: 1,
            max: 1,
        },
        {
            title: "ناتو",
            type: "mafia",
            min: 1,
            max: 1,
        },
        {
            title: "شیاد",
            type: "mafia",
            min: 1,
            max: 1,
        },
        {
            title: "مافیا ساده",
            type: "mafia",
            min: 0,
            max: 2,
        },
        {
            title: "دکتر",
            type: "citizen",
            min: 1,
            max: 1,
        },
        {
            title: "حرفه ای",
            type: "citizen",
            min: 1,
            max: 1,
        },
        {
            title: "کارآگاه",
            type: "citizen",
            min: 1,
            max: 1,
        },
        {
            title: "رویین تن",
            type: "citizen",
            min: 1,
            max: 1,
        },
        {
            title: "بازپرس",
            type: "citizen",
            min: 1,
            max: 1,
        },
        {
            title: "هانتر",
            type: "citizen",
            min: 1,
            max: 1,
        },
        {
            title: "شهروند ساده",
            type: "citizen",
            min: 1,
            max: 4,
        },
    ],
    bartender: [
        {
            title: "پدرخوانده",
            type: "mafia",
            min: 1,
            max: 1,
        },
        {
            title: "ناتو",
            type: "mafia",
            min: 1,
            max: 1,
        },
        {
            title: "دکتر لکتر",
            type: "mafia",
            min: 1,
            max: 1,
        },
        {
            title: "مافیا ساده",
            type: "mafia",
            min: 1,
            max: 2,
        },
        {
            title: "دکتر",
            type: "citizen",
            min: 1,
            max: 1,
        },
        {
            title: "حرفه ای",
            type: "citizen",
            min: 1,
            max: 1,
        },
        {
            title: "کارآگاه",
            type: "citizen",
            min: 1,
            max: 1,
        },
        {
            title: "جان سخت",
            type: "citizen",
            min: 1,
            max: 1,
        },
        {
            title: "ساقی",
            type: "citizen",
            min: 1,
            max: 1,
        },
        {
            title: "شهروند ساده",
            type: "citizen",
            min: 1,
            max: 5,
        },
    ],
    filimo: [
        {
            title: "پدرخوانده",
            type: "mafia",
            min: 1,
            max: 1,
        },
        {
            title: "دکتر لکتر",
            type: "mafia",
            min: 1,
            max: 1,
        },
        {
            title: "جوکر",
            type: "mafia",
            min: 1,
            max: 1,
        },
        {
            title: "مافیا ساده",
            type: "mafia",
            min: 1,
            max: 2,
        },
        {
            title: "دکتر",
            type: "citizen",
            min: 1,
            max: 1,
        },
        {
            title: "حرفه ای",
            type: "citizen",
            min: 1,
            max: 1,
        },
        {
            title: "کارآگاه",
            type: "citizen",
            min: 1,
            max: 1,
        },
        {
            title: "جان سخت",
            type: "citizen",
            min: 1,
            max: 1,
        },
        {
            title: "روانپزشک",
            type: "citizen",
            min: 1,
            max: 1,
        },
        {
            title: "شهردار",
            type: "citizen",
            min: 1,
            max: 1,
        },
        {
            title: "شهروند ساده",
            type: "citizen",
            min: 1,
            max: 4,
        },
    ],
    rifleman: [
        {
            title: "پدرخوانده",
            type: "mafia",
            min: 1,
            max: 1,
        },
        {
            title: "ناتو",
            type: "mafia",
            min: 1,
            max: 1,
        },
        {
            title: "گروگانگیر",
            type: "mafia",
            min: 1,
            max: 1,
        },
        {
            title: "مافیا ساده",
            type: "mafia",
            min: 1,
            max: 2,
        },
        {
            title: "دکتر",
            type: "citizen",
            min: 1,
            max: 1,
        },
        {
            title: "نگهبان",
            type: "citizen",
            min: 1,
            max: 1,
        },
        {
            title: "کارآگاه",
            type: "citizen",
            min: 1,
            max: 1,
        },
        {
            title: "تکاور",
            type: "citizen",
            min: 1,
            max: 1,
        },
        {
            title: "تفنگدار",
            type: "citizen",
            min: 1,
            max: 1,
        },
        {
            title: "شهروند ساده",
            type: "citizen",
            min: 1,
            max: 5,
        },
    ],
};
