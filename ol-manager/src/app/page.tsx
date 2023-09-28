import Dashboard from "./components/Dashboard";
import { HeaderNavbar } from "./components/HeaderNavbar";

export default function Home() {
  return (
    <>
      <HeaderNavbar />
      <main>
        <Dashboard />
      </main>
    </>
  )
}
