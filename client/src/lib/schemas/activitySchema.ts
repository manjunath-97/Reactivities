import { z } from 'zod'

const requiredString = (FieldName: string) => z.string({ required_error: `${FieldName} is required` }).min(1, `${FieldName} is required`);

export const activitySchema = z.object({
    title: requiredString("Title"),
    description: requiredString("Description"),
    category: requiredString("Category"),
    date: z.coerce.date({
        message:"Date is Required!"
    }),

    location: z.object({
        city: z.string().optional(),
        venue: requiredString("Venue"),
        latitude: z.coerce.number(),
        longitude: z.coerce.number()
    })
});

export type ActivitySchema = z.infer<typeof activitySchema>;

