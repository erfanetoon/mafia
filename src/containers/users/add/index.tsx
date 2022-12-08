import { ActionIcon } from "@mantine/core";
import { FC } from "react";
import { VscClose } from "react-icons/vsc";
import Form from "./form";

interface Props {
    handleClose: Function;
}

const Add: FC<Props> = ({ handleClose }) => {
    return (
        <>
            <ActionIcon
                variant="subtle"
                color="red"
                className="absolute top-2 left-2 transition-all duration-300"
                onClick={() => handleClose()}>
                <VscClose />
            </ActionIcon>

            <Form handleClose={handleClose} />
        </>
    );
};

export default Add;
