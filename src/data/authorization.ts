import { Dashboard, Login, Account, Users, ManageUser, Unauthorized, Scheduling, Placement } from "../views";
import Semesters from "../views/semesters";
import Sites from "../views/sites";

enum UserRoles {
    admin = "admin",
    preceptor = "preceptor",
    student = "student",
};

type AuthorizedRoutes = {
    [key: string]: {
        path: string;
        authorizedRoles?: string[];
        component: any;
        navigable?: boolean;
        icon?: any;
    };
};

const userRoles = {
    admins: [String(UserRoles.admin)],
    users: [String(UserRoles.preceptor), String(UserRoles.student)],
    all: [
        String(UserRoles.admin), String(UserRoles.preceptor), String(UserRoles.student)
    ]
};

const routes = {
    unauthorizedRoutes: {
        unauthorized: {
            path: "/unauthorized",
            component: Unauthorized
        },
        login: {
            path: "/",
            component: Login
        },
    } as AuthorizedRoutes,
    authorizedRoutes: {
        account: {
            path: "/account",
            authorizedRoles: userRoles.all,
            component: Account
        },
        dashboard: {
            path: "/dashboard",
            authorizedRoles: userRoles.all,
            component: Dashboard
        },
        placement: {
            path: "/placement/:placementId",
            authorizedRoles: userRoles.users,
            component: Placement,
            navigable: false
        },
        users: {
            path: "/users",
            authorizedRoles: userRoles.admins,
            component: Users
        },
        manageUser: {
            path: "/manageUser/:userId",
            authorizedRoles: userRoles.admins,
            component: ManageUser,
            navigable: false
        },
        scheduling: {
            path: "/scheduling",
            authorizedRoles: userRoles.admins,
            component: Scheduling
        },
        semesters: {
            path: "/semesters",
            authorizedRoles: userRoles.admins,
            component: Semesters
        },
        sites: {
            path: "/sites",
            authorizedRoles: userRoles.admins,
            component: Sites
        },
    } as AuthorizedRoutes,
    student: {
        account: {
            path: "/account",
            authorizedRoles: userRoles.all,
            component: Account
        },
        dashboard: {
            path: "/dashboard",
            authorizedRoles: userRoles.all,
            component: Dashboard
        },
        placement: {
            path: "/placement/:placementId",
            authorizedRoles: userRoles.users,
            component: Placement,
        },
    } as AuthorizedRoutes,
    preceptor: {
        account: {
            path: "/account",
            authorizedRoles: userRoles.all,
            component: Account
        },
        dashboard: {
            path: "/dashboard",
            authorizedRoles: userRoles.all,
            component: Dashboard
        },
    } as AuthorizedRoutes,
    admin: {
        users: {
            path: "/users",
            authorizedRoles: userRoles.admins,
            component: Users
        },
        scheduling: {
            path: "/scheduling",
            authorizedRoles: userRoles.admins,
            component: Scheduling
        },
        semesters: {
            path: "/semesters",
            authorizedRoles: userRoles.admins,
            component: Semesters
        },
        sites: {
            path: "/sites",
            authorizedRoles: userRoles.admins,
            component: Sites
        },
    } as AuthorizedRoutes,
};

const defaultRoutes = {
    "student": routes.student["dashboard"],
    "preceptor": routes.preceptor["dashboard"],
    "admin": routes.admin["sites"]
};

export type { AuthorizedRoutes };
export { userRoles, routes, defaultRoutes, UserRoles };