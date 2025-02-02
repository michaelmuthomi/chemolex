import { supabase } from '@/backend/client';
export async function fetchUsers() {
    const { data } = await supabase.from('mentees').select('*, guardian(*)');
    console.log("Data: ", data)
    return data;
}

export async function fetchUser(id) {
    const {data} = await supabase.from('mentees').select('*').eq('user_id', id);
    return data;
}