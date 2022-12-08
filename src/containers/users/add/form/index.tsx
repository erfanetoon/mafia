import { Formik, Form as FormikForm } from "formik";
import { FC, useState } from "react";
import { IFormData } from "./types";
import { Button, Input, Radio } from "@mantine/core";
import * as Yup from "yup";
import { useGameContext } from "@contexts/game";

interface Props {
    handleClose: Function;
}

const Form: FC<Props> = ({ handleClose }) => {
    const [initialValues] = useState<IFormData>({
        name: "",
        gender: "female",
    });
    const [isFirstTime, setIsFirstTime] = useState(true);

    const { users, handleAddUser } = useGameContext();

    const handleSubmit = (values: IFormData) => {
        handleAddUser({
            avatar:
                values.gender === "female"
                    ? "/images/womanAvatar.svg"
                    : "/images/manAvatar.svg",
            gender: values.gender,
            id: users.length + 1,
            name: values.name,
        });

        handleClose();
    };

    const CreateSchema = Yup.object().shape({
        name: Yup.string().required("نام بازیکن وارد نشده است"),
        gender: Yup.string().required("جنسیت وارد نشده است"),
    });

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
            enableReinitialize
            validationSchema={CreateSchema}
            validateOnMount={false}
            validateOnChange={!isFirstTime}
            validateOnBlur={!isFirstTime}
            validate={() => setIsFirstTime(false)}>
            {({ values, errors, handleSubmit, handleChange, handleBlur }) => (
                <FormikForm
                    className="h-full overflow-auto"
                    onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Input.Wrapper
                            id="name"
                            label="نام بازیکن"
                            required
                            error={errors.name}
                            classNames={{
                                error: "text-xs rtl:font-numeric",
                                label: "field-label text-xs",
                            }}>
                            <Input
                                variant="filled"
                                color="blue"
                                radius={9999}
                                id="name"
                                name="name"
                                type="text"
                                placeholder={"مانند: عرفان"}
                                classNames={{
                                    input: "shadow-md bg-dark-400",
                                }}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                invalid={!!errors.name}
                            />
                        </Input.Wrapper>
                    </div>

                    <div className="mb-10">
                        <Radio.Group
                            value={values.gender}
                            label="جنسیت"
                            onChange={(value: TGender) =>
                                handleChange({
                                    target: {
                                        id: "gender",
                                        name: "gender",
                                        value,
                                    },
                                })
                            }>
                            <Radio value="female" label="زن" />
                            <Radio value="male" label="مرد" />
                        </Radio.Group>
                    </div>

                    <div className="text-center flex items-center">
                        <Button
                            variant="filled"
                            className="transition-primary rtl:ml-4 ltr:mr-4"
                            color="red"
                            radius={9999}
                            fullWidth
                            type="submit">
                            ذخیره
                        </Button>

                        <Button
                            variant="filled"
                            className="transition-primary"
                            color="gray"
                            radius={9999}
                            onClick={() => handleClose()}>
                            انصراف
                        </Button>
                    </div>
                </FormikForm>
            )}
        </Formik>
    );
};

export default Form;
