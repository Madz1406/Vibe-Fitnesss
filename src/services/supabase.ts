import { createClient } from '@supabase/supabase-js';
import { UserProfile } from '../types';

// Replace these with your actual Supabase project credentials in your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dummy-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'dummy-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function saveUserProfile(profileData: Partial<UserProfile>) {
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        throw new Error("You must be logged in to save your profile.");
    }

    const { data, error } = await supabase
        .from('user_profiles')
        .upsert({
            user_id: user.id,
            name: profileData.name || '',
            age: profileData.age ? parseInt(profileData.age.toString()) : 0,
            gender: profileData.gender || 'unknown',
            height: profileData.height ? parseFloat(profileData.height.toString()) : 0,
            weight: profileData.weight ? parseFloat(profileData.weight.toString()) : 0,
            activity_level: profileData.activityLevel || 'sedentary',
            goal: profileData.goal || 'maintenance',
            diet_preference: (profileData.dietaryRestrictions || []).join(', '),
            food_dislikes: '',
            food_allergies: (profileData.medicalConditions || []).join(', '),
        }, { onConflict: 'user_id' })
        .select();

    if (error) {
        console.error("Error saving user profile:", error);
        throw error;
    }

    return data[0];
}

export async function getUserProfile(): Promise<UserProfile | null> {
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return null;
    }

    const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

    if (error) {
        if (error.code === 'PGRST116') {
            return null;
        }
        console.error("Error fetching user profile:", error);
        throw error;
    }

    // Reverse mapping from DB format to Frontend format
    const profile: UserProfile = {
        name: data.name,
        email: user.email,
        age: data.age,
        gender: data.gender as any,
        height: data.height,
        weight: data.weight,
        activityLevel: data.activity_level as any,
        goal: data.goal as any,
        dietaryRestrictions: data.diet_preference ? data.diet_preference.split(', ').filter(Boolean) : [],
        medicalConditions: data.food_allergies ? data.food_allergies.split(', ').filter(Boolean) : [],
        bodyFatPercentage: 0, // Fallback since it wasn't requested for DB
        fitnessExperience: data.fitness_experience || 'intermediate',
    };

    return profile;
}

export async function updateUserProfile(updates: any) {
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        throw new Error("You must be logged in to update your profile.");
    }

    const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('user_id', user.id)
        .select();

    if (error) {
        console.error("Error updating user profile:", error);
        throw error;
    }

    return data[0];
}
