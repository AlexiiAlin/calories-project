// core components
import VpnKey from "@material-ui/icons/VpnKey";
import Login from "./components/pages/auth/login/Login";
import ListFoodEntries from "./components/pages/patient/dashboard/ListFoodEntries";
import {UserType} from "./contexts/user-context";
import ManageUsers from "./components/pages/admin/manage-users/ManageUsers";
import Register from "./components/pages/auth/register/Register";
import PatientProfile from "./components/pages/patient/profile/PatientProfile";
import AddEditInfo from "./components/pages/patient/add-edit-info/AddEditInfo";
import AddEditFoodEntry from "./components/pages/patient/add-edit-food-entry/AddEditFoodEntry";

export type RouteLayout = '/auth' | '/patient' | '/admin';

export const ROUTES_LAYOUT = {
  AUTH: '/auth',
  PATIENT: '/patient',
  ADMIN: '/admin',
};

export const USER_TYPE_ROUTE = {
  [UserType.PATIENT]: ROUTES_LAYOUT.PATIENT,
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

export const patientRoutes: Array<Route> = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: VpnKey,
    iconColor: "Info",
    component: ListFoodEntries,
    layout: ROUTES_LAYOUT.PATIENT,
    roles: [UserType.PATIENT]
  },
  {
    path: "/profile",
    name: "Profile",
    icon: VpnKey,
    iconColor: "Info",
    component: PatientProfile,
    hideFromSidebar: true,
    layout: ROUTES_LAYOUT.PATIENT,
    roles: [UserType.PATIENT]
  },
  {
    path: "/edit-profile",
    name: "Edit profile",
    icon: VpnKey,
    iconColor: "Info",
    component: AddEditInfo,
    hideFromSidebar: true,
    layout: ROUTES_LAYOUT.PATIENT,
    roles: [UserType.PATIENT]
  },
  {
    path: "/add-food-entry",
    name: "Add food entry",
    icon: VpnKey,
    iconColor: "Info",
    component: AddEditFoodEntry,
    layout: ROUTES_LAYOUT.PATIENT,
    roles: [UserType.PATIENT]
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
  ...patientRoutes,
  ...adminRoutes,
];
