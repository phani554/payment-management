export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
}

// Mock users data
export const users: User[] = [
  {
    id: "user1",
    name: "Admin User",
    email: "admin@southindian.com",
    role: "admin"
  },
  {
    id: "user2",
    name: "Customer User",
    email: "customer@example.com",
    role: "customer"
  }
];

// Mock authentication function
export function authenticateUser(email: string): User | null {
  const user = users.find(u => u.email === email);
  return user || null;
}

// Current user state (for demo purposes)
let currentUser: User | null = null;

export function getCurrentUser(): User | null {
  return currentUser;
}

export function setCurrentUser(user: User | null): void {
  currentUser = user;
}

export function isAdmin(): boolean {
  return currentUser?.role === "admin";
}
