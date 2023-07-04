import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
// utils
import { fData } from '../../utils/formatNumber';
// routes
// @types
import { User } from '../../types';
// _mock
// components
import { CustomFile } from '../../components/upload';
import {
    FormProvider,
    RHFSelect,
    RHFTextField,
    RHFUploadAvatar,
} from '../../components/hook-form';
import { sexOptions } from '../../constants';
import { updateProfile } from '../../api/profile';

// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<User, 'avatar'> {
    avatar: CustomFile | string | null;
}

type Props = {
    isEdit: boolean;
    currentUser?: User;
};

export default function ProfileForm({ isEdit, currentUser }: Props) {
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    const NewUserSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required').email(),
        phone: Yup.string().required('Phone number is required'),
        sex: Yup.string().required('Last name required'),
        avatar: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
    });

    const defaultValues = useMemo(
        () => ({
            name: currentUser?.name || '',
            email: currentUser?.email || '',
            phone: currentUser?.phone || '',
            sex: currentUser?.sex || '男性',
            avatar: currentUser?.avatar || '',
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currentUser]
    );

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(NewUserSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        control,
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    useEffect(() => {
        if (isEdit && currentUser) {
            reset(defaultValues);
        }
        if (!isEdit) {
            reset(defaultValues);
        }
    }, [isEdit, currentUser]);

    const onSubmit = async (data: FormValuesProps) => {
        try {
            if (currentUser?.id) await updateProfile(currentUser.id, data as User)
            // reset();
            enqueueSnackbar(!isEdit ? 'Create success!' : '成功！', { variant: "success" });
            navigate(0)
        } catch (error) {
            console.error(error);
            enqueueSnackbar("Failed", { variant: "error", })
        }
    };

    const handleDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];

            if (file) {
                setValue(
                    'avatar',
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                );
            }
        },
        [setValue]
    );

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ py: 10, px: 3 }}>
                        <Box sx={{ mb: 5 }}>
                            <RHFUploadAvatar
                                name="avatar"
                                maxSize={3145728}
                                onDrop={handleDrop}
                                helperText={
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            mt: 2,
                                            mx: 'auto',
                                            display: 'block',
                                            textAlign: 'center',
                                            color: 'text.secondary',
                                        }}
                                    >
                                        *.jpeg, *.jpg, *.png, *.gif
                                        <br /> max size of {fData(3145728)}
                                    </Typography>
                                }
                            />
                        </Box>
                    </Card>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 3 }}>
                        <Box
                            sx={{
                                display: 'grid',
                                columnGap: 2,
                                rowGap: 3,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                            }}
                        >
                            <RHFTextField name="name" label="名前" />
                            <RHFTextField name="email" label="メール" />
                            <RHFTextField name="phone" label="電話番号" />

                            <RHFSelect name="sex" label="性別">
                                {
                                    sexOptions.map(s => (
                                        <option key={s}>{s}</option>
                                    ))
                                }
                            </RHFSelect>
                        </Box>

                        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                {!isEdit ? 'Create User' : '保存'}
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
