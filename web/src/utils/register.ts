import { z } from 'zod';
import { Locale } from '../store/locale';

export const RegisterFormSchema = z.object({
  firstName: z
    .string()
    .min(3, Locale.invalid_firstName || 'First Name must contain at least 3 character(s)')
    .max(20),
  lastName: z
    .string()
    .min(3, Locale.invalid_lastName || 'Last Name must contain at least 3 character(s)')
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
