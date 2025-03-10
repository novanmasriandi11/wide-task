import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface SidebarItemProps {
   icon        : LucideIcon;
   title       : string;
   path        : string;
   extraPaths ?: string[];
   alert      ?: boolean;
   isCollapsed?: boolean;
}

export interface HeaderItemProps{
   title  : string;
   path   : string;
   active?: boolean;
}

export interface LayoutProps{
   children: ReactNode;
}

export type ThemeType = "light" | "dark";

export interface ThemeContextType{
   theme      : ThemeType;
   toggleTheme: () => void;
}

export interface Todo {
   id       : number;
   userId   : number;
   title    : string;
   completed: boolean;
}