import { Dashboard, Login, Account, Placements, Users, ManageUser, Unauthorized, Scheduling } from "../views";
import Semesters from "../views/semesters";

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
    }
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
        placements: {
            path: "/placements",
            authorizedRoles: userRoles.users,
            component: Placements
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
    } as AuthorizedRoutes,
}

export { userRoles, routes, UserRoles }