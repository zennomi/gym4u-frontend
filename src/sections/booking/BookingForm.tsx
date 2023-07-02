import { Controller, useForm } from "react-hook-form"
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router";
import { FormProvider, RHFTextField } from "../../components/hook-form"
import { AuthUser, Gym } from "../../types"
import { Stack } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { DateTimePicker } from "@mui/x-date-pickers"
import { postBooking } from "../../api/booking";
import { PATH_PAGE } from "../../routes/paths";

type FormValuesProps = {
    name: string
    email: string
    phone: string
    gym: string
    from: Date
    to: Date
}

export default function BookingForm({ gym, user }: { gym: Gym, user: AuthUser }) {
    const navigate = useNavigate()

    const minDate = new Date(Date.now() + 24 * 3600 * 1000)

    const defaultValues = {
        email: user ? user.email : '',
        name: user ? user.name : '',
        phone: user ? user.phone : '',
        gym: gym.id,
        from: minDate,
        to: minDate,
    };

    const FormSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        email: Yup.string().required('Email is required').email('That is not an email'),
        phone: Yup.string().required("Phone is required"),
        from: Yup.date().nullable().required('Start date is required'),
        to: Yup.date()
            .required('End date is required')
            .nullable()
            .min(Yup.ref('from'), 'End date must be later than start date'),
    });

    const methods = useForm<FormValuesProps>({
        defaultValues,
        resolver: yupResolver(FormSchema),
    });

    const {
        reset,
        handleSubmit,
        control,
        formState: { isSubmitting },
        watch,
    } = methods;

    const values = watch()

    const onSubmit = async (data: FormValuesProps) => {
        try {
            console.log(data)
            await postBooking(data)
            navigate(PATH_PAGE.profile("me"))
        } catch (error) {
            console.error(error);
            reset();
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <RHFTextField name="name" label="名前" disabled={!!user} />

                <RHFTextField name="email" label="メール" disabled={!!user} />

                <RHFTextField name="phone" label="電話番号" disabled={!!user} />

                <Controller
                    name="from"
                    control={control}
                    render={({ field }) => (
                        <DateTimePicker
                            {...field}
                            label="から"
                            minDate={minDate}
                        />
                    )}
                />

                <Controller
                    name="to"
                    control={control}
                    render={({ field }) => (
                        <DateTimePicker
                            {...field}
                            label="まで"
                            minDateTime={values.from}
                        />
                    )}
                />

                <LoadingButton
                    type="submit"
                    loading={isSubmitting}
                    disabled={values.from >= values.to}
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