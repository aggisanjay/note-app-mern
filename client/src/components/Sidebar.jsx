import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Home, Folder, Users, Archive, Trash, Plus } from "lucide-react"

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const nav = [
    { label: "All Notes", icon: Home, to: "/notes", match: () => location.pathname === "/notes" && !location.search },
    { label: "Categories", icon: Folder, to: "/categories", match: () => location.pathname === "/categories" },

    { label: "Shared With Me", icon: Users, to: "/notes?shared=1", match: () => location.search.includes("shared=1") },

    { label: "Archive", icon: Archive, to: "/notes?archived=1", match: () => location.search.includes("archived=1") },

    { label: "Trash", icon: Trash, to: "/notes?trash=1", match: () => location.search.includes("trash=1") }
  ]

  return (
    <aside className="w-64 shrink-0 border-r bg-white p-4 hidden md:flex md:flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Notes</h1>
        <Button size="sm" onClick={() => navigate("/notes")}>
          <Plus className="w-4 h-4 mr-1" /> New
        </Button>
      </div>

      <nav className="space-y-1">
        {nav.map((item) => {
          const active = item.match()

          return (
            <NavLink
              key={item.label}
              to={item.to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition 
                hover:bg-gray-100 
                ${active ? "bg-gray-200 font-semibold text-black" : "text-gray-700"}
              `}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="mt-auto text-xs text-gray-500">
        <p className="mt-4">Made with ❤️</p>
      </div>
    </aside>
  )
}
