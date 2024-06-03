import { Form, Link } from "react-router-dom"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { cn } from "@/lib/utils"


export function Nav({ links, isCollapsed }) {


  return (
    <TooltipProvider>
      <div
        data-collapsed={isCollapsed}
        className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
      >
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map((link, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Select>
                    <SelectTrigger>
                      <button
                        onClick={link.onClick}
                        className={cn(
                          buttonVariants({ variant: link.variant, size: "icon" }),
                          "h-9 w-9",
                          link.variant === "default" &&
                          "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                        )}
                      >
                        <link.icon className="h-4 w-4" />
                        <span className="sr-only">{link.title}</span>
                      </button>
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TooltipTrigger>
                <TooltipContent side="right" className="flex items-center gap-4">
                  {link.title}
                  {link.label && (
                    <span className="ml-auto text-muted-foreground">
                      {link.label}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            ) : (
              <button
                key={index}
                onClick={link.onClick}
                className={cn(
                  buttonVariants({ variant: link.variant, size: "sm" }),
                  link.variant === "default" &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                  "justify-start"
                )}
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.title}
                {link.label && (
                  <span
                    className={cn(
                      "ml-auto",
                      link.variant === "default" &&
                      "text-background dark:text-white"
                    )}
                  >
                    {link.label}
                  </span>
                )}
              </button>
            )
          )}
        </nav>
      </div>
    </TooltipProvider>
  )
}
