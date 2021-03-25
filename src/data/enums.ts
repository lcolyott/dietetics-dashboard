enum UserRoles {
    superAdmin = "superAdmin",
    admin = "admin",
    preceptor = "preceptor",
    student = "student",
    base = "base",
};

enum AuthRoutes {
    dashboard = "/dashboard",
    placements = "/placements",
    account = "/account"
};

enum NonAuthRoutes {
    login = "/",
    unauthorized = "unauthorized"
};

const userRoles = {
    admins: [String(UserRoles.superAdmin), String(UserRoles.admin)],
    users: [String(UserRoles.preceptor), String(UserRoles.student)],
    all: [
        String(UserRoles.superAdmin), String(UserRoles.admin), String(UserRoles.preceptor), String(UserRoles.student), String(UserRoles.base)
    ]
};

export { userRoles, UserRoles, AuthRoutes, NonAuthRoutes }