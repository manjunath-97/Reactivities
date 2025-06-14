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

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "activities",
                element : <ActivityDashboard/>
            },
            {
                path: "createActivity",
                element : <ActivityForm key='create'/>
            },
            {
                path: "activities/:id",
                element: <ActivityDetailsPage/>
            },
            {
                path: "manage/:id",
                element : <ActivityForm/>
            },
            {
                path: "counter",
                element: <Counter />
            },
            {
                path: "TestErrors",
                element: <TestErrors />
            },
            {
                path: "not-found",
                element: <NotFound />
            },
            {
                path: "server-error",
                element: <ServerError />
            },
            {
                path: "*",
                element: <Navigate replace to="/not-found"/>
            }
        ]
    }
]) 