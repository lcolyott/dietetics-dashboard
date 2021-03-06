import { AccountCircle, Apartment, Assessment, Dashboard as MDashboard, EventNote, ListAlt, MenuBook, PeopleAlt, Schedule } from "@material-ui/icons";
import { Dashboard, Login, Account, Users, ManageUser, Unauthorized, Scheduling, Placement, Administration, Reports, Semesters, Sites, Templates } from "../views";

// Holds definitions for user roles and routes

enum UserRoles {
    superadmin = "superadmin",
    admin = "admin",
    preceptor = "preceptor",
    student = "student",
};

interface AuthorizedRoute {
    path: string;
    authorizedRoles?: string[];
    component: any;
    label?: string;
    icon?: any;
    navigable?: boolean;
};

type AuthorizedRoutes = {
    [key: string]: AuthorizedRoute;
};

const userRoles = {
    admins: [String(UserRoles.superadmin), String(UserRoles.admin)],
    users: [String(UserRoles.preceptor), String(UserRoles.student)],
    all: [
        String(UserRoles.superadmin), String(UserRoles.admin), String(UserRoles.preceptor), String(UserRoles.student)
    ]
};

const unauthorizedRoutes: AuthorizedRoutes = {
    unauthorized: {
        path: "/unauthorized",
        component: Unauthorized
    },
    login: {
        path: "/",
        component: Login
    },
};

const authorizedRoutes: AuthorizedRoutes = {
    account: {
        path: "/account",
        label: "Account",
        icon: AccountCircle,
        authorizedRoles: userRoles.all,
        component: Account
    },
    dashboard: {
        path: "/dashboard",
        label: "Dashboard",
        icon: MDashboard,
        authorizedRoles: [...userRoles.users, userRoles.admins[0]],
        component: Dashboard
    },
    placement: {
        path: "/placement/:placementId",
        authorizedRoles: [...userRoles.users, userRoles.admins[0]],
        component: Placement,
    },
    administration: {
        path: "/administration",
        label: "Administration",
        icon: Assessment,
        authorizedRoles: userRoles.admins,
        component: Administration
    },
    manageUser: {
        path: "/manageUser/:userId",
        authorizedRoles: userRoles.admins,
        component: ManageUser,
        navigable: false,
    },
    reports: {
        path: "/reports",
        label: "Reports",
        icon: MenuBook,
        authorizedRoles: userRoles.admins,
        component: Reports
    },
    scheduling: {
        path: "/scheduling",
        label: "Scheduling",
        icon: Schedule,
        authorizedRoles: userRoles.admins,
        component: Scheduling
    },
    semesters: {
        path: "/semesters",
        label: "Semesters",
        icon: EventNote,
        authorizedRoles: userRoles.admins,
        component: Semesters,
    },
    sites: {
        path: "/sites",
        label: "Sites",
        icon: Apartment,
        authorizedRoles: userRoles.admins,
        component: Sites
    },
    templates: {
        path: "/templates",
        label: "Templates",
        icon: ListAlt,
        authorizedRoles: userRoles.admins,
        component: Templates
    },
    users: {
        path: "/users",
        label: "Users",
        icon: PeopleAlt,
        authorizedRoles: userRoles.admins,
        component: Users
    },
};

const studentRoutes: AuthorizedRoutes = {
    default: authorizedRoutes["dashboard"],
    "account": authorizedRoutes["account"],
    "dashboard": authorizedRoutes["dashboard"],
    "placement": authorizedRoutes["placement"]
};

const preceptorRoutes: AuthorizedRoutes = {
    default: authorizedRoutes["dashboard"],
    "account": authorizedRoutes["account"],
    "dashboard": authorizedRoutes["dashboard"],
    "placement": authorizedRoutes["placement"]
};

const adminRoutes: AuthorizedRoutes = {
    default: authorizedRoutes["administration"],
    "account": authorizedRoutes["account"],
    "administration": authorizedRoutes["administration"],
    "semesters": authorizedRoutes["semesters"],
    "scheduling": authorizedRoutes["scheduling"],
    "users": authorizedRoutes["users"],
    "sites": authorizedRoutes["sites"],
    "templates": authorizedRoutes["templates"],
    "reports": authorizedRoutes["reports"]
};

const superAdminRoutes: AuthorizedRoutes = {
    default: authorizedRoutes["administration"],
    ...authorizedRoutes
}

const routes = {
    unauthorizedRoutes,
    authorizedRoutes,
    "student": studentRoutes,
    "preceptor": preceptorRoutes,
    "admin": adminRoutes,
    "superadmin": superAdminRoutes,
};

function getDefaultRoute(userRole: "Admin" | "Student" | "Preceptor" | "SuperAdmin"): AuthorizedRoute {
    return routes[userRole.toLowerCase() as "admin" | "student" | "preceptor" | "superadmin"]["default"];
};

export type { AuthorizedRoute, AuthorizedRoutes };
export { userRoles, routes, UserRoles, getDefaultRoute };
