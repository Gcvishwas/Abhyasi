import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PublicLayout from "@/layouts/public-layout"
import HomePage from "@/routes/home"
import AuthenticationLayout from "./authlayout"
import SignIn from "./routes/sign-in"
import SignUp from "./routes/sign-up"

const App = () => {
  return (
    <Router>
      <Routes>
        {/* public routes */}
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
        </Route>

        {/* authentication layout */}
        <Route element={<AuthenticationLayout />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>



        {/* private routes */}
      </Routes>
    </Router>
  )
}

export default App
