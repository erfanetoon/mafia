import RootLayout from "@layouts/root";
import UsersContainer from "@containers/users";

const Users = () => {
    return (
        <RootLayout title="بازیکن های من" withHeader previousRoute="homepage">
            <UsersContainer />
        </RootLayout>
    );
};

export default Users;
