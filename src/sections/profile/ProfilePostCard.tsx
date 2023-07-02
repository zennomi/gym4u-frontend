// @mui
import {
  Link,
  Card,
  Stack,
  Typography,
  CardHeader,
  IconButton,
  styled,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// @types
import { Booking, Gym, User } from '../../types';
// hooks
// utils
import { fDate, fDateTime } from '../../utils/formatTime';
// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import MyAvatar from '../../components/MyAvatar';
import { PATH_PAGE } from '../../routes/paths';

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

interface Props {
  user: User;
  booking: Booking
}

export default function ProfilePostCard({ user, booking }: Props) {
  const gym = booking.gym as Gym
  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={<MyAvatar />}
        title={
          <Link variant="subtitle2" color="text.primary">
            {user?.name}
          </Link>
        }
        subheader={
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
            {fDateTime(booking.createdAt || new Date())}
          </Typography>
        }
        action={
          <IconButton>
            <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
          </IconButton>
        }
      />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack>
          <Stack direction="row" alignItems="center">
            <IconStyle icon="map:gym" />
            <Typography variant="h5">
              <Link component={RouterLink} to={PATH_PAGE.gymDetails(gym.id)}>
                {gym.name}
              </Link>

            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <IconStyle icon="lucide:clock" />
            <Typography variant="body1">{fDateTime(booking.from)} ~ {fDateTime(booking.to)}</Typography>
          </Stack>
        </Stack>

        <Image alt="post media" src={gym.images[0]} ratio="16/9" sx={{ borderRadius: 1 }} />

      </Stack>
    </Card>
  );
}
