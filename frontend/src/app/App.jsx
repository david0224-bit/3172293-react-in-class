
import { RouterProvider } from "react-router-dom";
import router from "@/app/router";
import ThemeProvider from "@/shared/context/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
