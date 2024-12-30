"use client";

import { Home, ShoppingCart, Info, Phone, Settings, Droplet, Newspaper } from "lucide-react"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items with corresponding section labels from Body component
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Products",
    url: "#Products", // Matches section aria-label in Body
    icon: ShoppingCart,
  },
  {
    title: "Blog",
    url: "#Latest Blog Posts", // Matches section aria-label in Body
    icon: Newspaper,
  },
  {
    title: "About Us",
    url: "#Latest Blog Posts", // This section contains the "Know More About Us"
    icon: Info,
  },
  {
    title: "Contact",
    url: "#contact",
    icon: Phone,
  },
  {
    title: "Engine Oil Guide",
    url: "#guide",
    icon: Droplet,
  },
  {
    title: "Settings",
    url: "#settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    if (url.startsWith('#')) {
      e.preventDefault();
      // Find section by aria-label
      const element = document.querySelector(`section[aria-label="${url.substring(1)}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold text-green-500">
            Royal 9 Engine Oil
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      href={item.url}
                      onClick={(e) => handleClick(e, item.url)}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
