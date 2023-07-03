// hooks
import useAuth from '../hooks/useAuth';
import { getAvatarFromString } from '../utils/random';
// utils
//
import Avatar, { Props as AvatarProps } from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }: AvatarProps) {
  const { user } = useAuth();
  const avatarUrl = user?.avatar || getAvatarFromString(user?.id || "bruh")
  return (
    <Avatar
      src={avatarUrl}
      alt={user?.displayName}
      color={"default"}
      {...other}
    >
      {user?.name || "bruh"}
    </Avatar>
  );
}
