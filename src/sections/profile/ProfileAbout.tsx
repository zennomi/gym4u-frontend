// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@mui/material';
// @types
import { User } from '../../types';
// components
import Iconify from '../../components/Iconify';
import { capitalCase } from 'change-case';

// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

type Props = {
  user: User;
};

export default function ProfileAbout({ user }: Props) {
  const { sex, email, role, phone } = user;

  return (
    <Card>
      <CardHeader title="プロフィール" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row">
          <IconStyle icon={'eva:flag-fill'} />
          <Typography variant="body2">
            {capitalCase(role)}
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'eva:people-fill'} />
          <Typography variant="body2">
            {sex}
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'eva:email-fill'} />
          <Typography variant="body2">{email}</Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'eva:phone-fill'} />
          <Typography variant="body2">{phone}</Typography>
        </Stack>

      </Stack>
    </Card>
  );
}
