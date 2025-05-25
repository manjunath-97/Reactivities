import { format } from 'date-fns';
export default function formatDate(date: string|Date|number)
{
    return format(date, "dd MMM yyyy h:mm a")
}