import { createBrowserRouter, Navigate} from "react-router";
import App from "../layout/App";
import Home from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/forms/ActivityForm";
import ActivityDetailsPage from "../../features/activities/details/ActivityDetailsPage";
import Counter from "../../features/counter/Counter"
import TestErrors from "../../features/errors/TestErrors";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/login/LoginFom";
import RequireAuth from "../router/RequireAuth";
import RegisterForm from "../../features/login/RegisterForm";
import ProfilePage from "../../features/profiles/ProfilePage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children:
        [
                {
                element: <RequireAuth />,
                children: [
                    {
                        path: "activities",
                        element: <ActivityDashboard />
                    },
                    {
                        path: "createActivity",
                        element: <ActivityForm key='create' />
                    },
                    {
                        path: "activities/:id",
                        element: <ActivityDetailsPage />
                    },
                    {
                        path: "manage/:id",
                        element: <ActivityForm />
                    },
                    {
                        path: "profiles/:id",
                        element : <ProfilePage/>
                    }
                ]
            },
            { path: "",element: <Home/>},
            { path: "counter", element: <Counter /> },
            { path: "TestErrors", element: <TestErrors /> },
            { path: "not-found", element: <NotFound /> },
            { path: "server-error", element: <ServerError /> },
            { path: "*", element: <Navigate replace to="/not-found" /> },
            { path: "login", element: <LoginForm /> },
            { path: "register", element: <RegisterForm /> }
            ]
    }
]) 