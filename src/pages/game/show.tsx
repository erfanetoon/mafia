import ShowRolesContainer from "@containers/game/show";
import PageLayout from "@layouts/page";

const ShowRoles = () => {
    return (
        <PageLayout
            root={{
                title: "توزیع نقش",
            }}
            previousRoute="homepage"
            title="توزیع نقش">
            <ShowRolesContainer />
        </PageLayout>
    );
};

export default ShowRoles;
