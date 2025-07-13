import { format } from 'date-fns';
import { z } from 'zod';

export default function formatDate(date: string|Date|number)
{
    return format(date, "dd MMM yyyy h:mm a")
}


export const requiredString = (FieldName: string) => z.string(
    { required_error: `${FieldName} is required` })
    .min(1, `${FieldName} is required`);
