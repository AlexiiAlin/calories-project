// core components
import VpnKey from "@material-ui/icons/VpnKey";
import Login from "./components/pages/auth/login/Login";
import ListFoodEntries from "./components/pages/user/dashboard/ListFoodEntries";
import {UserType} from "./contexts/user-context";
import ManageUsers from "./components/pages/admin/manage-users/ManageUsers";
import Register from "./components/pages/auth/register/Register";
import UserProfile from "./components/pages/user/profile/UserProfile";
import AddEditInfo from "./components/pages/user/add-edit-info/AddEditInfo";
import AddEditFoodEntry from "./components/pages/user/add-edit-food-entry/AddEditFoodEntry";
import CaloriesDashboard from "./components/pages/user/calories-dashboard/CaloriesDashboard";

export type RouteLayout = '/auth' | '/user' | '/admin';

export const ROUTES_LAYOUT = {
  AUTH: '/auth',
  USER: '/user',
  ADMIN: '/admin',
};

export const USER_TYPE_ROUTE = {
  [UserType.USER]: ROUTES_LAYOUT.USER,
  [UserType.ADMIN]: ROUTES_LAYOUT.ADMIN,
};

interface Route {
  path: string;
  name: string;
  icon: any;
  iconColor: string;
  component: any;
  hideFromSidebar?: boolean;
  layout: any;
  roles: Array<UserType>;
}

export const authRoutes = [
  {
    path: "/login",
    name: "Login",
    icon: VpnKey,
    iconColor: "Info",
    component: Login,
    layout: ROUTES_LAYOUT.AUTH,
    roles: [],
    hideFromSidebar: true,
  },
  {
    path: "/register",
    name: "Register",
    icon: VpnKey,
    iconColor: "Info",
    component: Register,
    layout: ROUTES_LAYOUT.AUTH,
    roles: [],
    hideFromSidebar: true,
  }
];

export const userRoutes: Array<Route> = [
  {
    path: "/dashboard",
    name: "Food entries",
    icon: VpnKey,
    iconColor: "Info",
    component: ListFoodEntries,
    layout: ROUTES_LAYOUT.USER,
    roles: [UserType.USER]
  },
  {
    path: "/calories",
    name: "Calories dashboard",
    icon: VpnKey,
    iconColor: "Info",
    component: CaloriesDashboard,
    layout: ROUTES_LAYOUT.USER,
    roles: [UserType.USER]
  },
  {
    path: "/profile",
    name: "Profile",
    icon: VpnKey,
    iconColor: "Info",
    component: UserProfile,
    hideFromSidebar: true,
    layout: ROUTES_LAYOUT.USER,
    roles: [UserType.USER]
  },
  {
    path: "/edit-profile",
    name: "Edit profile",
    icon: VpnKey,
    iconColor: "Info",
    component: AddEditInfo,
    hideFromSidebar: true,
    layout: ROUTES_LAYOUT.USER,
    roles: [UserType.USER]
  },
  {
    path: "/add-food-entry",
    name: "Add food entry",
    icon: VpnKey,
    iconColor: "Info",
    component: AddEditFoodEntry,
    layout: ROUTES_LAYOUT.USER,
    roles: [UserType.USER]
  },
];

export const adminRoutes = [
  {
    path: "/dashboard",
    name: "Mange food entries",
    icon: VpnKey,
    iconColor: "Info",
    component: ListFoodEntries,
    layout: ROUTES_LAYOUT.ADMIN,
    roles: [UserType.ADMIN]
  },
  {
    path: "/manage-users",
    name: "Manage users",
    icon: VpnKey,
    iconColor: "Info",
    component: ManageUsers,
    layout: ROUTES_LAYOUT.ADMIN,
    roles: [UserType.ADMIN]
  },
  {
    path: "/add-food-entry",
    name: "Add food entry",
    icon: VpnKey,
    iconColor: "Info",
    component: AddEditFoodEntry,
    layout: ROUTES_LAYOUT.ADMIN,
    roles: [UserType.ADMIN]
  },
  {
    path: "/edit-food-entry",
    name: "Edit food entry",
    icon: VpnKey,
    iconColor: "Info",
    component: AddEditFoodEntry,
    hideFromSidebar: true,
    layout: ROUTES_LAYOUT.ADMIN,
    roles: [UserType.ADMIN]
  },
];

export const routes = [
  ...authRoutes,
  ...userRoutes,
  ...adminRoutes,
];
