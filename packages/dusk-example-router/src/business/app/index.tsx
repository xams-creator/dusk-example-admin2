import React from 'react';
import { Link, RouterProvider } from 'react-router-dom';

import router from '@/configuration/router';

export default function App() {
    return <RouterProvider router={router} />;
}
