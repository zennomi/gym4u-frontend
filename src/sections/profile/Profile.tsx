// @mui
import { Grid, Stack } from '@mui/material';
//
import ProfileAbout from './ProfileAbout';
import ProfilePostCard from './ProfilePostCard';
import ProfileFollowInfo from './ProfileFollowInfo';
import ProfileSocialInfo from './ProfileSocialInfo';
import { Booking, User } from '../../types';
import { useEffect, useState } from 'react';
import { getBookingsByEmail } from '../../api/booking';

// ----------------------------------------------------------------------

type Props = {
  user: User;
};

export default function Profile({ user }: Props) {
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    const getBookings = async () => {
      const data = await getBookingsByEmail(user.email)
      setBookings(data.results)
    }
    getBookings()
    return () => setBookings([])
  }, [user])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileFollowInfo />
          <ProfileAbout user={user} />
          <ProfileSocialInfo user={user} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          {bookings.map((booking) => (
            <ProfilePostCard key={booking.id} user={user} booking={booking} />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}
