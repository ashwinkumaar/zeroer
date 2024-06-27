import type { UseMutateFunction } from '@tanstack/react-query';
// import validator from "validator";
import z from 'zod';

export const formSchema = z.object({
  id: z.string().refine((arg) => {
    const idRegex = /^\d{8}$/g;
    return !!arg.matchAll(idRegex);
  }, 'Please enter an ID of a valid format.'),
  name: z.string(),
  address: z.string(),
  city: z.string(),
  // phone: z.string().refine((arg) => validator.isMobilePhone(arg, 'en-SG')),  // Example to define custom validation logic (Error will show up in form!)
  phone: z.string(), // Example to define custom validation logic
});

export type TFormKey = keyof typeof formSchema.shape;

export type TFormData = z.infer<typeof formSchema>;

export type TAPIMutFunc = UseMutateFunction<Response, Error, TFormData, unknown>;
