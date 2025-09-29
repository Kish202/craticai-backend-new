
// src/repositories/authRepository.js
import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseKey = process.env.SUPABASE_KEY;

// const supabase = createClient(supabaseUrl, supabaseKey);
// const supabase = createClient('https://zrcxncrywssgnxkgewsi.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyY3huY3J5d3NzZ254a2dld3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3NTI1MjYsImV4cCI6MjA3MTMyODUyNn0.n9thb-NSp-gK0e620RvG0ZtNrgMz9AabfE-J5UyIhFQ');
const supabase = createClient('https://hjwzxypjecuogxgjagrh.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhqd3p4eXBqZWN1b2d4Z2phZ3JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1ODU1MDYsImV4cCI6MjA3MTE2MTUwNn0.9jz_WFq10vJ_oU3k_Nfo2Rt2baxVlIgocWfYnd-XToY')
export const findUserByEmail = async (email) => {
  console.log("🔍 findUserByEmail called with:", email);
    console.log("🔍 Trying to fetch user:", email);
  console.log("Supabase URL:", supabase);
  // console.log("Supabase Key length:", supabaseKey?.length);

  const { data, error } = await supabase
    .from('auth_table')
    .select('*')
    .eq('email', email)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error("❌ Supabase fetch error:", error);
    throw error;
  }

  console.log("✅ User data:", data);
  return data;
};

export const createUser = async (email, password) => {
  console.log("➕ createUser called with:", email);
  const { error } = await supabase
    .from('auth_table')
    .insert([{ email, password }]);

  if (error) {
    console.error("❌ Supabase insert error:", error);
    throw error;
  }

  console.log("✅ User created successfully");
};

export const findById = async (id) => {
  console.log("🔍 findById called with:", id);
  const { data, error } = await supabase
    .from('auth_table')
    .select('*')
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error("❌ Supabase fetch error:", error);
    throw error;
  }

  console.log("✅ User data by ID:", data);
  return data;
};
