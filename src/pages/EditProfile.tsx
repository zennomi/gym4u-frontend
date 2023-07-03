// @mui
import { Container, Typography } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import useAuth from '../hooks/useAuth';
import LoadingScreen from '../components/LoadingScreen';
import ProfileForm from '../sections/profile/ProfileForm';

// ----------------------------------------------------------------------

export default function PageOne() {
    const { user } = useAuth()
    if (!user) return <LoadingScreen />
    return (
        <Page title="ユーザー編集フォーム">
            <Container sx={(theme) => ({
                paddingTop: theme.spacing(10),
                [theme.breakpoints.up('md')]: {
                    paddingTop: theme.spacing(15),
                },
            })}>
                <ProfileForm isEdit={true} currentUser={user} />
            </Container>
        </Page>
    );
}
