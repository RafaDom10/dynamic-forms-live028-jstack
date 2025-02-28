import { ThemeProvider } from "./context/ThemeProvider"

export function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div>
        <h1>App</h1>
      </div>
    </ThemeProvider>
  )
}