import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Dashboard } from "./pages/userpages/Dashboard";
import { Service } from "./pages/userpages/Service";
import { Orders } from "./pages/userpages/Orders";
import { Payments } from "./pages/userpages/Payment";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Error } from "./pages/Error";
import { Logout } from "./pages/userpages/Logout";
import { AdminLayout } from "./components/layouts/Admin-Layout";
import { AdminUsers } from "./pages/admin/Admin-Users";
import { AdminContacts } from "./pages/admin/Admin-Contacts";
import { AdminUpdate } from "./pages/admin/Admin-Update";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/service" element={<Service />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/payments" element={<Payments />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="*" element={<Error />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="users" element={<AdminUsers />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="users/:id/edit" element={<AdminUpdate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
