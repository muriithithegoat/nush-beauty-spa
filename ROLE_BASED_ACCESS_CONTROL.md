# Role-Based Access Control (RBAC) Documentation

## Overview
The application now has a complete role-based access control system with three user roles: **Customer**, **Admin**, and **Staff**.

## User Roles

### 1. **Customer**
- Default role for new users
- Can view and update their own profile
- Can make bookings and payments
- Can submit support tickets

### 2. **Admin**
- Full access to all system resources
- Can view all users and their information
- Can update user roles (change customer to staff, staff to admin, etc.)
- Can delete users
- Can view user statistics
- Can manage all bookings, payments, and support tickets

### 3. **Staff**
- Can assist with bookings and payments
- Can manage support tickets
- Can view customer information for service purposes
- Cannot delete users or change roles

## Database Schema

The `UsersTable` in `src/Drizzle/schema.ts` includes:
```typescript
role: varchar("Role", { length: 20 }).default("customer")
```

This field stores the user's role and defaults to "customer" for new registrations.

## Authentication

### Login & JWT Token
When users log in via `/api/auth/login`, they receive a JWT token that includes:
```javascript
{
  userID: number,
  email: string,
  role: "customer" | "admin" | "staff"
}
```

### Using the Token
Include the token in requests using the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## API Endpoints

### User Endpoints (`/api/users`)

#### 1. Register User (Public)
```
POST /api/users/register
Body: {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phoneNumber?: string,
  address?: string,
  role?: "customer" | "admin" | "staff"  // defaults to "customer"
}
```

#### 2. Get All Users (Admin Only)
```
GET /api/users
Headers: Authorization: Bearer <token>
Required Role: admin
```

#### 3. Get User by ID (Authenticated)
```
GET /api/users/:id
Headers: Authorization: Bearer <token>
```

#### 4. Update User (Authenticated)
```
PUT /api/users/:id
Headers: Authorization: Bearer <token>
Body: { firstName?, lastName?, phoneNumber?, address?, ... }
```

#### 5. Delete User (Admin Only)
```
DELETE /api/users/:id
Headers: Authorization: Bearer <token>
Required Role: admin
```

### Admin Endpoints (`/api/admin`)
All admin endpoints require authentication and admin role.

#### 1. Get All Users
```
GET /api/admin/users
Headers: Authorization: Bearer <token>
Returns: List of all users with their details
```

#### 2. Update User Role
```
PUT /api/admin/users/:id/role
Headers: Authorization: Bearer <token>
Body: { role: "customer" | "admin" | "staff" }
Returns: Updated user role
```

Valid roles: `customer`, `admin`, `staff`

#### 3. Get User Statistics
```
GET /api/admin/statistics
Headers: Authorization: Bearer <token>
Returns: {
  totalUsers: number,
  adminCount: number,
  staffCount: number,
  customerCount: number
}
```

## Middleware

### Authentication Middleware (`src/middleware/auth.ts`)
- Validates JWT tokens
- Extracts user information from token
- Adds user object to request

### Role-Based Access Middleware (`src/middleware/Requirerole.ts`)

**Available functions:**

```typescript
// Require specific role
requireRole("admin") // Allows only admin
requireRole("customer") // Allows only customer
requireRole("staff") // Allows only staff

// Require any of multiple roles
requireAnyRole("admin", "staff") // Allows admin or staff

// Convenience functions
requireAdmin() // Shortcut for requireRole("admin")
requireCustomer() // Shortcut for requireRole("customer")
```

## Usage Examples

### Example 1: Register a New User
```bash
curl -X POST http://localhost:8085/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "securePassword123",
    "phoneNumber": "0712345678",
    "address": "123 Main St"
  }'
```

### Example 2: Login User
```bash
curl -X POST http://localhost:8085/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

Response:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "userID": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

### Example 3: Admin Updates User Role
```bash
curl -X PUT http://localhost:8085/api/admin/users/1/role \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin_token>" \
  -d '{
    "role": "staff"
  }'
```

### Example 4: Admin Gets User Statistics
```bash
curl -X GET http://localhost:8085/api/admin/statistics \
  -H "Authorization: Bearer <admin_token>"
```

Response:
```json
{
  "totalUsers": 10,
  "adminCount": 1,
  "staffCount": 2,
  "customerCount": 7
}
```

## Protecting Routes

### Example: Protect a route with specific role
```typescript
import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { requireAdmin } from "../middleware/Requirerole";

const router = Router();

// Only admins can access this route
router.delete("/:id", authenticate, requireAdmin, deleteHandler);

export default router;
```

### Example: Allow multiple roles
```typescript
import { requireAnyRole } from "../middleware/Requirerole";

// Allow admin or staff
router.get("/data", authenticate, requireAnyRole("admin", "staff"), getDataHandler);
```

## Key Files Modified

1. **src/middleware/Requirerole.ts** - Updated to support all three roles
2. **src/middleware/auth.ts** - Enhanced JWT validation and typing
3. **src/users/users.router.ts** - Added role-based access control
4. **src/admin/admin.controller.ts** - New admin management endpoints
5. **src/admin/admin.router.ts** - New admin routes
6. **src/index.ts** - Registered admin router

## Security Notes

1. Always verify JWT tokens with the authenticate middleware
2. Use requireRole or requireAnyRole for sensitive operations
3. Never expose passwords in responses
4. Keep JWT_SECRET in environment variables
5. Implement rate limiting for login endpoints
6. Consider implementing refresh tokens for longer sessions

## Next Steps

1. Add email verification for user registration
2. Implement password reset functionality
3. Add audit logging for admin actions
4. Implement two-factor authentication (2FA)
5. Add role-based data filtering in responses
