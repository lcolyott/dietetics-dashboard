import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { signIn, signOut } from "../../../data/API/session";
import { UserSignInArgs } from "../../../data/events";
import { Contact, Site, User } from "../../../data/models";
import { RootState } from "../../store";

interface UserState {
    status: "Idle" | "Loading";
    user?: User;
    userRole?: string;
    contact?: Contact;
    site?: Site;
};

const initialState: UserState = {
    status: "Idle",
    user: process.env.NODE_ENV === "development" ?
        (sessionStorage.getItem("testuser") ?
            JSON.parse(sessionStorage.getItem("testuser") as string) as User
            :
            undefined
        )
        :
        undefined
};

// Async sign in function
// TODO: Add SessionController endpoint to the fetch
// Read more about createAsyncThunk {@link https://redux-toolkit.js.org/api/createAsyncThunk}
// Read more about fetch {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API}
const signInAsync = createAsyncThunk(
    'user/signIn',
    async (args: UserSignInArgs) => {
        const user: User = await signIn(args);

        return user;
    }
);

// TODO: Add SessionController endpoint to the fetch
const signOutAsync = createAsyncThunk(
    'user/signOut',
    async () => {
        const response = await signOut();

        return response;
    }
)

// TODO: Create async thunks that can pull the contact or site object when needed
// Read more about createSlice {@link https://redux-toolkit.js.org/api/createSlice}
const userSlice = createSlice({
    name: "userslice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signInAsync.pending, (state, action) => {
            return {
                status: "Loading",
            };
        })
        builder.addCase(signInAsync.fulfilled, (state, action) => {
            if (process.env.NODE_ENV === "development") {
                sessionStorage.setItem("testuser", JSON.stringify(action.payload));
                return {
                    status: "Idle",
                    user: {
                        Id: -1,
                        ContactId: -1,
                        Active: true,
                        Name: "Test User",
                        Email: "TestUser@Email.com",
                        Phone: "xxx-xxx-xxxx",
                        Role: "Admin"
                    },
                    userRole: "Admin"
                };
            }

            return {
                status: "Idle",
                user: action.payload,
                userRole: action.payload.Role,
            };
        })
        builder.addCase(signInAsync.rejected, (state, action) => {
            return {
                status: "Idle",
            };
        })
        builder.addCase(signOutAsync.pending, (state, action) => {
            return {
                status: "Loading",
            };
        })
        builder.addCase(signOutAsync.fulfilled, (state, action) => {
            if (process.env.NODE_ENV === "development") {
                sessionStorage.removeItem("testuser");
            }

            return {
                status: "Idle"
            };
        })
        builder.addCase(signOutAsync.rejected, (state, action) => {
            // ???
        })
    }
});

function mapState(state: RootState) {
    return { ...state.userReducer }
};

const mapDispatch = {
    signIn: signInAsync,
    signOut: signOutAsync
};

const userStateConnector = connect(mapState);
const userConnector = connect(mapState, mapDispatch);

export { userConnector, userStateConnector };
export type { UserState };
export default userSlice.reducer;