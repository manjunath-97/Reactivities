import { createBrowserRouter} from "react-router";
import App from "../layout/App";
import Home from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/ActivityDashboard";
import ActivityForm from "../../features/activities/forms/ActivityForm";
import ActivityDetails from "../../features/activities/ActivityDetails";

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
                element : <ActivityDetails/>
            },
            {
                path: "manage/:id",
                element : <ActivityForm/>
            }

        ]
    }
]) 