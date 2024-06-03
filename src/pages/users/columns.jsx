import { Button } from "@/components/ui/button"
import {ArrowUpDown, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
 

export const columns = [
  {
    accessorKey: "_id",
    header: "id",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "isApproved",
    header: "status",
  },
  // {
  //   accessorKey: "isApproved",
  //   header: "enrolled",
  // },
  // {
  //   accessorKey: "action",
  //   header: "action",
  // },
  {
    // this action and dropdowntable
    id: "actions",
    cell: ({ row }) => {
      const users = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(users._id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]


export const data =[
  {
      "_id": "665b46796e8e4360e3d96521",
      "name": "Suraj Kumar",
      "email": "suraj123@gmail.com",
      "role": "user",
      "isApproved": true,
      "profilePicture": "https://res.cloudinary.com/do4cvkenc/image/upload/v1717257848/uploads/profile-images/zujcbuczpwikegbiuyuu.jpg",
      "phoneNo": "",
      "github": "",
      "linkedin": "",
      "resume": "",
      "bio": "",
      "skills": [],
      "experience": [],
      "createdAt": "2024-06-01T16:04:09.763Z",
      "updatedAt": "2024-06-02T19:47:50.810Z",
      "__v": 0
  },
  {
      "_id": "665b4c93d0a3d9717be2504e",
      "name": "Vikee Sinha",
      "email": "vikee123@gmail.com",
      "role": "user",
      "isApproved": true,
      "profilePicture": "https://res.cloudinary.com/do4cvkenc/image/upload/v1717259410/uploads/profile-images/if9qaibskhznl7ej5w01.jpg",
      "phoneNo": "",
      "github": "",
      "linkedin": "",
      "resume": "",
      "bio": "",
      "skills": [],
      "experience": [],
      "createdAt": "2024-06-01T16:30:11.338Z",
      "updatedAt": "2024-06-01T16:30:11.338Z",
      "__v": 0
  },
  {
      "_id": "665b4d5ad0a3d9717be25052",
      "name": "kalpana",
      "email": "kalpana@gmail.com",
      "role": "user",
      "isApproved": true,
      "profilePicture": "https://res.cloudinary.com/do4cvkenc/image/upload/v1717259609/uploads/profile-images/yk1fi0gitud1hwwbsqzj.jpg",
      "phoneNo": "",
      "github": "",
      "linkedin": "",
      "resume": "",
      "bio": "",
      "skills": [],
      "experience": [],
      "createdAt": "2024-06-01T16:33:30.129Z",
      "updatedAt": "2024-06-01T16:33:30.129Z",
      "__v": 0
  },
  {
    "_id": "665b4c93d0a3d9717be2504e",
    "name": "Vikee Sinha",
    "email": "vikee123@gmail.com",
    "role": "user",
    "isApproved": true,
    "profilePicture": "https://res.cloudinary.com/do4cvkenc/image/upload/v1717259410/uploads/profile-images/if9qaibskhznl7ej5w01.jpg",
    "phoneNo": "",
    "github": "",
    "linkedin": "",
    "resume": "",
    "bio": "",
    "skills": [],
    "experience": [],
    "createdAt": "2024-06-01T16:30:11.338Z",
    "updatedAt": "2024-06-01T16:30:11.338Z",
    "__v": 0
},
{
    "_id": "665b4d5ad0a3d9717be25052",
    "name": "kalpana",
    "email": "kalpana@gmail.com",
    "role": "user",
    "isApproved": true,
    "profilePicture": "https://res.cloudinary.com/do4cvkenc/image/upload/v1717259609/uploads/profile-images/yk1fi0gitud1hwwbsqzj.jpg",
    "phoneNo": "",
    "github": "",
    "linkedin": "",
    "resume": "",
    "bio": "",
    "skills": [],
    "experience": [],
    "createdAt": "2024-06-01T16:33:30.129Z",
    "updatedAt": "2024-06-01T16:33:30.129Z",
    "__v": 0
},
{
  "_id": "665b4c93d0a3d9717be2504e",
  "name": "Vikee Sinha",
  "email": "vikee123@gmail.com",
  "role": "user",
  "isApproved": true,
  "profilePicture": "https://res.cloudinary.com/do4cvkenc/image/upload/v1717259410/uploads/profile-images/if9qaibskhznl7ej5w01.jpg",
  "phoneNo": "",
  "github": "",
  "linkedin": "",
  "resume": "",
  "bio": "",
  "skills": [],
  "experience": [],
  "createdAt": "2024-06-01T16:30:11.338Z",
  "updatedAt": "2024-06-01T16:30:11.338Z",
  "__v": 0
},
{
  "_id": "665b4d5ad0a3d9717be25052",
  "name": "kalpana",
  "email": "kalpana@gmail.com",
  "role": "user",
  "isApproved": true,
  "profilePicture": "https://res.cloudinary.com/do4cvkenc/image/upload/v1717259609/uploads/profile-images/yk1fi0gitud1hwwbsqzj.jpg",
  "phoneNo": "",
  "github": "",
  "linkedin": "",
  "resume": "",
  "bio": "",
  "skills": [],
  "experience": [],
  "createdAt": "2024-06-01T16:33:30.129Z",
  "updatedAt": "2024-06-01T16:33:30.129Z",
  "__v": 0
},
{
  "_id": "665b4c93d0a3d9717be2504e",
  "name": "Vikee Sinha",
  "email": "vikee123@gmail.com",
  "role": "user",
  "isApproved": true,
  "profilePicture": "https://res.cloudinary.com/do4cvkenc/image/upload/v1717259410/uploads/profile-images/if9qaibskhznl7ej5w01.jpg",
  "phoneNo": "",
  "github": "",
  "linkedin": "",
  "resume": "",
  "bio": "",
  "skills": [],
  "experience": [],
  "createdAt": "2024-06-01T16:30:11.338Z",
  "updatedAt": "2024-06-01T16:30:11.338Z",
  "__v": 0
},
{
  "_id": "665b4d5ad0a3d9717be25052",
  "name": "kalpana",
  "email": "kalpana@gmail.com",
  "role": "user",
  "isApproved": true,
  "profilePicture": "https://res.cloudinary.com/do4cvkenc/image/upload/v1717259609/uploads/profile-images/yk1fi0gitud1hwwbsqzj.jpg",
  "phoneNo": "",
  "github": "",
  "linkedin": "",
  "resume": "",
  "bio": "",
  "skills": [],
  "experience": [],
  "createdAt": "2024-06-01T16:33:30.129Z",
  "updatedAt": "2024-06-01T16:33:30.129Z",
  "__v": 0
},
{
  "_id": "665b4c93d0a3d9717be2504e",
  "name": "Vikee Sinha",
  "email": "vikee123@gmail.com",
  "role": "user",
  "isApproved": true,
  "profilePicture": "https://res.cloudinary.com/do4cvkenc/image/upload/v1717259410/uploads/profile-images/if9qaibskhznl7ej5w01.jpg",
  "phoneNo": "",
  "github": "",
  "linkedin": "",
  "resume": "",
  "bio": "",
  "skills": [],
  "experience": [],
  "createdAt": "2024-06-01T16:30:11.338Z",
  "updatedAt": "2024-06-01T16:30:11.338Z",
  "__v": 0
},
{
  "_id": "665b4d5ad0a3d9717be25014",
  "name": "kaushal",
  "email": "ka@gmail.com",
  "role": "user",
  "isApproved": true,
  "profilePicture": "https://res.cloudinary.com/do4cvkenc/image/upload/v1717259609/uploads/profile-images/yk1fi0gitud1hwwbsqzj.jpg",
  "phoneNo": "",
  "github": "",
  "linkedin": "",
  "resume": "",
  "bio": "",
  "skills": [],
  "experience": [],
  "createdAt": "2024-06-01T16:33:30.129Z",
  "updatedAt": "2024-06-01T16:33:30.129Z",
  "__v": 0
}
] // Remove the trailing comma here


