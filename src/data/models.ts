import { UserRoles } from "./authorization";

interface User {
    Id: number;
    Name: string;
    Email: string;
    Phone: string;
    Role: string;
};

export type { User }