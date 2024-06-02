
// This type is used to define the shape of our data.


// You can use a Zod schema here if you want.
export const User = {
  id: string,
  name: String,
  email: string,
  enrolled: String
}

export const columns = [
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "id",
    header: "id",
    
  },
  {
    accessorKey: "enrolled",
    header: "enrolled",
    
  },
]

