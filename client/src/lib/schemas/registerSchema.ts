import { z } from 'zod';
import { requiredString } from "../util/util";

export const registerSchema = z.object({
    displayName: requiredString("displayName"),
    email: z.string().email(),
    password: requiredString('password')
});

export type RegisterSchema = z.infer<typeof registerSchema>;
