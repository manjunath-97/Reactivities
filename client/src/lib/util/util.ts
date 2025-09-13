import { DateArg, format, formatDistanceToNow } from "date-fns";
import { z } from 'zod';

export function formatDate(date: DateArg<Date>)
{
    return format(date, "dd MMM yyyy h:mm a")
}

export function timeAgo(date: DateArg<Date>) {
    return formatDistanceToNow(date) + ' ago'
}


export const requiredString = (FieldName: string) => z.string(
    { required_error: `${FieldName} is required` })
    .min(1, `${FieldName} is required`);