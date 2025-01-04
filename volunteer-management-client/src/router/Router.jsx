import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import AllVolunteer from "../pages/AllVolunteer";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddVolunteer from "../pages/AddVolunteer";
import MyPost from "../pages/MyPost";
import PrivateRoute from "./PrivateRoute";
import VolunteerDetails from "../pages/VolunteerDetails";
import BeVolunteer from "../pages/BeVolunteer";
import MyVolunteerReq from "../pages/MyVolunteerReq";
import UpdatePost from "../pages/UpdatePost";

const router = createBrowserRouter([
    {
        path:'/',
        element:<MainLayout></MainLayout>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path:'/',
                element:<Home></Home>,
                loader: ()=>fetch('https://volunteer-management-server-inky.vercel.app/add-volunteer')
            },
            {
                path:'/all-volunteer',
                element:<AllVolunteer></AllVolunteer>
                
            },
            {
               path:'/volunteer-details/:id',
               element:<PrivateRoute>
                <VolunteerDetails></VolunteerDetails>
               </PrivateRoute>,
               loader:({params})=> fetch(`https://volunteer-management-server-inky.vercel.app/volunteer/${params.id}`)
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/register',
                element:<Register></Register>
            },
            {
                path:'/add-volunteer',
                element:<PrivateRoute>
                    <AddVolunteer></AddVolunteer>
                </PrivateRoute>
            },
            {
                path:'/myPost',
                element:<PrivateRoute>
                    <MyPost></MyPost>
                </PrivateRoute>
            },
            {
                path:'/update-post/:id',
                element:<PrivateRoute>
                    <UpdatePost></UpdatePost>
                </PrivateRoute>,
                loader:({params})=> fetch(`https://volunteer-management-server-inky.vercel.app/volunteer/${params.id}`)
            },
            {
                path:'/be-volunteer/:id',
                element:<PrivateRoute>
                    <BeVolunteer></BeVolunteer>
                </PrivateRoute>,
                loader:({params})=> fetch(`https://volunteer-management-server-inky.vercel.app/volunteer/${params.id}`)
            },
            {
                path:'/myVolunteerReq',
                element:<PrivateRoute>
                    <MyVolunteerReq></MyVolunteerReq>
                </PrivateRoute>
            }
        ]
    }
])

export default router;