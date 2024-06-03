import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { cn } from "@/lib/utils";
import { SelectGroup, SelectItem, SelectLabel, Select, SelectContent, SelectTrigger, SelectValue } from "./select";
import { LogOutIcon , Loader2} from "lucide-react";
import { UserLogout } from "@/common/apiHandler";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/common/AuthProvider";
import { useState } from "react";

export function Nav({ links, isCollapsed }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function userLoggingOut(){
    setLoading(true)
    UserLogout(navigate, logout)
    setLoading(false)
  }

  return (
    <TooltipProvider>
      <div
        data-collapsed={isCollapsed}
        className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 items-center justify-between h-[90vh]"
      >
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map((link, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  {/* <Select>
                    <SelectTrigger> */}

                  <button
                    // onClick={link.onClick}
                    className={cn(
                      buttonVariants({
                        variant: link.variant,
                        size: "icon",
                      }),
                      "h-9 w-9",
                      link.variant === "default" &&
                      "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    <span className="sr-only">{link.title}</span>
                  </button>

                  {/* / */}
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.title}
                  {link.label && (
                    <span className="ml-auto text-muted-foreground">
                      {link.label}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Accordion type="single" collapsible className="w-[180px]">
                <AccordionItem value="item-1">
                  <AccordionTrigger>

                    <button
                      key={index}
                      onClick={link.onClick}
                      className={cn(
                        buttonVariants({ variant: link.variant, size: "sm" }),
                        link.variant === "default" &&
                        "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                        "justify-start w-full text-left px-4 py-2 rounded-lg mr-3"
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

                  </AccordionTrigger>
                  <AccordionContent>
                    {
                      link.title === "Course" ? (

                        //This is the select component if u wnat to use u cabn use this one as well
                        // <Select>
                        //   <SelectTrigger>
                        //     <SelectValue placeholder="Select a Course" />
                        //     <SelectGroup>
                        //       <SelectLabel> Selected  </SelectLabel>
                        //       <SelectContent>
                        //         <SelectItem value="DSA">DSA</SelectItem>
                        //         <SelectItem value="Web Dev" >Web Dev</SelectItem>
                        //         <SelectItem value="Java">Java</SelectItem>
                        //         <SelectItem value="Python">Python</SelectItem>
                        //       </SelectContent>
                        //     </SelectGroup>
                        //   </SelectTrigger>
                        // </Select>


                        // This is the button component option if u want to use button component
                        <>
                          <Button variant='ghost' className="w-full" onClick={link.onClick}>DSA</Button>
                          <Button variant='ghost' className="w-full">Web Dev</Button>
                          <Button variant='ghost' className="w-full">Java</Button>
                          <Button variant='ghost' className="w-full">Python</Button>
                        </>                      
                      ) : null
                    }
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )
          )}
        </nav>
        <Button
          onClick={userLoggingOut} 
          variant='ghost' 
          disabled={loading} 
          className="w-full hover:bg-black hover:border hover:text-white"> 
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging Out
              </>
            ) : (
              <>
                <LogOutIcon className="mr-2 h-4 w-4" />
                Logout
              </>
            )}
          </Button>
      </div>
    </TooltipProvider>
  );
}
