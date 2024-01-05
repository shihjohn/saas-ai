import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserAvatar = async () => {
  const session = await getServerSession(options);

  const user = session?.user;

  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={user?.image!} />
      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
