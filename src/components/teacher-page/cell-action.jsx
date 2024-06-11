import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Pencil, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {deleteUserById} from '../../common/apiHandler';
import { useAuth } from "@/common/AuthProvider";

export function CellAction({ data }) {
  const navigate = useNavigate();
  const { setDeleteUserData,  } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  // const [datas, setData] = useState();


  
  // Function to handle deletion of a record
  const DeleteRecord = async (_id) => {
    setDeleteUserData( await deleteUserById(_id) );
  };
   

  return (
    <div className="flex justify-center space-x-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
          
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-secondary"
                onClick={() => navigate(`/teacher-form/${data._id}`)}
            >
                <Pencil className="h-4 w-4 text-foreground" />
           
            </Button>
          
          </TooltipTrigger>
          <TooltipContent>
            <p>Update employee</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <AlertDialog>
              <AlertDialogTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-secondary"
                >
                  <Trash2 className="h-4 w-4 text-foreground" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your record and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => DeleteRecord(data._id)}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete employee</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
