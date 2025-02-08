import { z } from 'zod';
import { Locale } from '../store/locale';

export const RegisterFormSchema = z.object({
  firstname: z
    .string()
    .min(3, Locale.invalid_firstname || 'First Name must contain at least 3 character(s)')
    .max(20),
  lastname: z
    .string()
    .min(3, Locale.invalid_lastname || 'Last Name must contain at least 3 character(s)')
    .max(20),
  nationality: z.object({
    value: z.string(),
    label: z.string(),
  }),
  birthdate: z.date({
    required_error: Locale.invalid_date || 'Date is required',
    invalid_type_error: Locale.invalid_format || 'Format invalid',
  }),
  gender: z.object({
    value: z.string(),
    label: z.string(),
  }),
});

export type RegisterFormType = z.infer<typeof RegisterFormSchema>;
