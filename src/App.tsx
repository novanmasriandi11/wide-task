import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import { ThemeProvider } from "./context/ThemeContext"
import Layout from "./components/layout/Layout"
import Home from "./pages/task-navigation/Home"
import About from "./pages/task-navigation/About"
import TaskIntegration from "./pages/api-integration/TaskIntegration"
import TaskForm from "./pages/form-page/TaskForm"
import Counter from "./pages/task-counter/counter"

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/menu1" replace />} />
            <Route path="/number-counter" element={<Counter/>} />
            <Route path="/form-handling" element={<TaskForm/>} />
            <Route path="/api-integration" element={<TaskIntegration/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/about" element={<About/>} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
