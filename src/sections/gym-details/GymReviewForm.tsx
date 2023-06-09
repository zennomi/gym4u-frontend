import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { styled, Typography, Stack, Rating, FormHelperText, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { RHFTextField, FormProvider } from "../../components/hook-form";
import { LoadingButton } from '@mui/lab';
import { Gym } from '../../types';
import { postFeedback } from '../../api/feedback';
import { useFeedbackGym, useGym } from '../../hooks/useGym';



const RootStyle = styled('div')(({ theme }) => ({
    margin: theme.spacing(3),
    padding: theme.spacing(3),
    borderRadius: Number(theme.shape.borderRadius) * 2,
    backgroundColor: theme.palette.background.neutral,
}));

// ----------------------------------------------------------------------

type FormValuesProps = {
    rating: number;
    content: string;
};

type Props = {
    gym: Gym;
    onClose: VoidFunction;
    id?: string;
};

export default function GymReviewForm({ gym, onClose, id, ...other }: Props) {
    const { mutate } = useFeedbackGym(gym.id)
    const { mutate: mutateGym } = useGym(gym.id)

    const ReviewSchema = Yup.object().shape({
        rating: Yup.number().required('Rating is required'),
        content: Yup.string().required('Review is required'),
    });

    const defaultValues = {
        rating: 5,
        content: '',
    };

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(ReviewSchema),
        defaultValues,
    });

    const {
        reset,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = methods;

    const onSubmit = async (data: FormValuesProps) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            await postFeedback({ ...data, gymId: gym.id })
            mutate();
            mutateGym();
            reset();
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    const onCancel = () => {
        onClose();
        reset();
    };

    return (
        <RootStyle {...other} id={id}>
            <Typography variant="subtitle1" gutterBottom>
                コメント
            </Typography>

            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                    <div>
                        <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1.5}>
                            <Typography variant="body2">評点</Typography>

                            <Controller
                                name="rating"
                                control={control}
                                render={({ field }) => <Rating {...field} value={Number(field.value)} />}
                            />
                        </Stack>
                        {!!errors.rating && <FormHelperText error> {errors.rating?.message}</FormHelperText>}
                    </div>

                    <RHFTextField name="content" label="コメント..." multiline rows={3} />

                    <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                        <Button color="inherit" variant="outlined" onClick={onCancel}>
                            キャンセル
                        </Button>
                        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                            コメント
                        </LoadingButton>
                    </Stack>
                </Stack>
            </FormProvider>
        </RootStyle>
    );
}
