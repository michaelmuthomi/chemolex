import { supabase } from '@/backend/client';
export async function fetchOrders() {
    const { data, error } = await supabase.from('mentees').select('*');
    if (error) {
        throw error;
    }
    console.log(`Orders data: ${data}`);
    return data;
}