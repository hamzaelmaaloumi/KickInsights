import { RouterProvider } from "react-router-dom";
import { routers } from "./router/index";
import UserProvider from "./context/UserContext";

function App() {
  return (
    <div>
      <UserProvider>
        <RouterProvider router={routers} />
      </UserProvider>
    </div>
  );
}

export default App;
