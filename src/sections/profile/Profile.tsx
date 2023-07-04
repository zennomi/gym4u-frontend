// @mui
import { Grid, Pagination, Stack } from '@mui/material';
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
  const [page, setPage] = useState(1)
  const limit = 5

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
          <ProfileAbout user={user} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          {bookings.map((booking) => (
            <ProfilePostCard key={booking.id} user={user} booking={booking} />
          ))}
          {
            bookings.length > 0 &&
            <Pagination count={Math.floor(bookings.length / limit) + 1} onChange={(event, value) => setPage(value)} color="primary" />
          }
        </Stack>
      </Grid>
    </Grid>
  );
}
