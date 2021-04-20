import react from "react";

interface UserSignInArgs {
    Username: string;
    Password: string;
    rememberMe?: boolean;
    lockout?: boolean;
};

interface UserCreationArgs {

};

export type { UserSignInArgs, UserCreationArgs };