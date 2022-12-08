import dayjs from "dayjs";
import jalaliday from "jalaliday";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fa";
import "dayjs/locale/en";

dayjs.extend(relativeTime);

const DateHelper = ({
    datetime,
    calendar = "jalali",
    format = "DD MMMM YYYY - HH:mm",
    fromNow = false,
}: {
    datetime: string;
    format?: string;
    calendar?: "jalali" | "gregory";
    fromNow?: boolean;
}) => {
    if (!dayjs) {
        return "";
    }

    if (calendar === "jalali") {
        dayjs.extend(jalaliday);
    }

    dayjs.locale(calendar === "jalali" ? "fa" : "en");

    // @ts-ignore
    dayjs.calendar && dayjs.calendar(calendar);

    if (fromNow) {
        // @ts-ignore
        return dayjs(datetime).fromNow();
    } else {
        return dayjs(datetime).format(format);
    }
};

export default DateHelper;
