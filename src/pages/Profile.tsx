// @mui
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container } from '@mui/material';

// hooks
import useAuth from '../hooks/useAuth';
import useTabs from '../hooks/useTabs';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import {
    Profile,
    ProfileCover,
} from '../sections/profile';
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
    zIndex: 9,
    bottom: 0,
    width: '100%',
    display: 'flex',
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up('sm')]: {
        justifyContent: 'center',
    },
    [theme.breakpoints.up('md')]: {
        justifyContent: 'flex-end',
        paddingRight: theme.spacing(3),
    },
}));

// ----------------------------------------------------------------------

export default function UserProfile() {
    const { user } = useAuth();

    const { currentTab, onChangeTab } = useTabs('ブッキング');

    if (!user) return <LoadingScreen />

    const PROFILE_TABS = [
        {
            value: 'ブッキング',
            icon: <Iconify icon={'heroicons-solid:ticket'} width={20} height={20} />,
            component: <Profile user={user} />,
        },
    ];

    return (
        <Page title="プロフィール">
            <Container sx={(theme) => ({
                paddingY: theme.spacing(10),
                [theme.breakpoints.up('md')]: {
                    paddingY: theme.spacing(15),
                },
            })}>
                <Card
                    sx={{
                        mb: 3,
                        height: 280,
                        position: 'relative',
                    }}
                >
                    <ProfileCover user={user} />

                    <TabsWrapperStyle>
                        <Tabs
                            allowScrollButtonsMobile
                            variant="scrollable"
                            scrollButtons="auto"
                            value={currentTab}
                            onChange={onChangeTab}
                        >
                            {PROFILE_TABS.map((tab) => (
                                <Tab
                                    disableRipple
                                    key={tab.value}
                                    value={tab.value}
                                    icon={tab.icon}
                                    label={(tab.value)}
                                />
                            ))}
                        </Tabs>
                    </TabsWrapperStyle>
                </Card>

                {PROFILE_TABS.map((tab) => {
                    const isMatched = tab.value === currentTab;
                    return isMatched && <Box key={tab.value}>{tab.component}</Box>;
                })}
            </Container>
        </Page>
    );
}
