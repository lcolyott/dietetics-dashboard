import { UserSignInArgs } from "../../events";
import { User } from "../../models";


async function signIn(args: UserSignInArgs): Promise<any> {
    let response = fetch(`api/Session/Login/${args.Username}/${args.Password}/${args.rememberMe}/${args.lockout}`, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(response => response.json()).then(user => user as User)
        .catch(() => {
            // If development, return test user
            if (process.env.NODE_ENV === "development") {
                let testUser: User = {
                    Id: -1,
                    ContactId: -1,
                    Active: true,
                    Name: "Test User",
                    Email: "TestUser@Email.com",
                    Phone: "xxx-xxx-xxxx",
                    Role: "Admin"
                }

                return testUser;
            }
        });

    return response;
};

async function signOut(): Promise<any> {
    let response = fetch(`api/Session/Logout`, {
        method: "PUT",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then()
        .catch();

    return response;
};

export { signIn, signOut };