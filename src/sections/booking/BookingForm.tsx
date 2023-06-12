import { useForm } from "react-hook-form"
import { FormProvider, RHFTextField } from "../../components/hook-form"
import { Gym } from "../../types"
import { Button, Stack } from "@mui/material"
import { LoadingButton } from "@mui/lab"

type FormValuesProps = {
    name: string
    email: string
    phone: string
    gym: string
}

export default function BookingForm({ gym }: { gym: Gym }) {
    const defaultValues = {
        email: '',
        name: '',
        phone: '',
        gym: gym.id
    };

    const methods = useForm<FormValuesProps>({
        defaultValues,
    });

    const {
        reset,
        setError,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = methods;

    const onSubmit = async (data: FormValuesProps) => {
        try {
            console.log(data)
        } catch (error) {
            console.error(error);
            reset();
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <RHFTextField name="name" label="名前" />

                <RHFTextField name="email" label="メール" />

                <RHFTextField name="phone" label="電話番号" />

                <LoadingButton
                    type="submit"
                    loading={isSubmitting}
                    fullWidth
                    variant="contained"
                    size="large"
                >
                    ブッキング
                </LoadingButton>
            </Stack>
        </FormProvider>
    )
}