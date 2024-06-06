import { z } from "zod";

// Example
export const employeeFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  gender: z.string().min(1),
});

export const employeeFromValues = employeeFormSchema.infer();

export const employeeColumn = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string(),
  createAt: z.string(),
  updateAt: z.string(),
});

// export const employeeColumn = employeeColumn.infer();

export const updateEmployeeFormSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string(),
});
