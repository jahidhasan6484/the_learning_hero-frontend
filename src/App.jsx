import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="font-ubuntu bg-gradient-to-r from-[#F0F2F5] via-gray-200 to-[#F0F2F5]">
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
