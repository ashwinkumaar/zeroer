import { TFormData, TFormKey, formDefaultValues } from '@/components/sections/main';
import { z } from 'zod';

export const filterSchema = z.object({
  // id: z.string().regex(/^\d*$/, 'Please enter an integer ID containing only digits'),
  name: z.string(),
  address: z.string(),
  city: z.string(),
  // phone: z.string().refine((arg) => validator.isMobilePhone(arg, 'en-SG')),  // Example to define custom validation logic (Error will show up in form!)
  phone: z.string(), // Example to define custom validation logic
});
export type TFilterSchema = TFormData;

export type TFilterSchemaKey = TFormKey;

export const filterDefaultValues = formDefaultValues;
