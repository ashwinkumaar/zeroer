import type { UseMutateFunction } from '@tanstack/react-query';
// import validator from "validator";
import z from 'zod';

export const formSchema = z.object({
  id: z.string().regex(/^\d+$/, 'Please enter an integer ID containing only digits'),
  name: z.string().min(3, 'Enter at least 3 characters'),
  address: z.string().min(3, 'Enter at least 3 characters'),
  city: z.string().min(3, 'Enter at least 3 characters'),
  // phone: z.string().refine((arg) => validator.isMobilePhone(arg, 'en-SG')),  // Example to define custom validation logic (Error will show up in form!)
  phone: z.string().min(3, 'Enter at least 3 characters'), // Example to define custom validation logic
});

export type TFormKey = keyof typeof formSchema.shape;

export type TFormData = z.infer<typeof formSchema>;

export type TAPIMutFunc = UseMutateFunction<Response, Error, TFormData, unknown>;

export const formDefaultValues: TFormData = {
  id: '',
  name: '',
  address: '',
  city: '',
  phone: '',
};

export const placeholders = {
  id: 'S123',
  name: 'John Doe',
  address: '5 Park Avenue',
  city: 'New York City',
  phone: '812345678',
};
