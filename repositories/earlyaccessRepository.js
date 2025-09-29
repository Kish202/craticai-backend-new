const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://hjwzxypjecuogxgjagrh.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhqd3p4eXBqZWN1b2d4Z2phZ3JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1ODU1MDYsImV4cCI6MjA3MTE2MTUwNn0.9jz_WFq10vJ_oU3k_Nfo2Rt2baxVlIgocWfYnd-XToY')

// Insert new client
exports.insertClient = async (clientData) => {
  const { data, error } = await supabase
    .from('waitlist_clients')
    .insert([{
      ...clientData,
      status: false   // ensure default
    }])
    .select('*');

  if (error) {
    console.error("❌ Supabase insert error:", error.message);
    throw new Error(error.message);
  }

  return data[0];
};

// Fetch all clients
exports.fetchAllClients = async () => {
  const { data, error } = await supabase
    .from('waitlist_clients')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("❌ Supabase fetch error:", error.message);
    throw new Error(error.message);
  }

  return data;
};
