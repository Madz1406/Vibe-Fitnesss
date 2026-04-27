import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { LogOut, ArrowLeft, Save, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface ProfileProps {
    profile: UserProfile;
    onUpdateProfile: (profile: UserProfile) => Promise<void>;
    onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ profile, onUpdateProfile, onLogout }) => {
    const [formData, setFormData] = useState<Partial<UserProfile>>({});
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState<string | null>(null);

    const getUserEmail = () => {
        if (profile.email) return profile.email;
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const parsed = JSON.parse(storedUser);
                if (parsed.email) return parsed.email;
            }
        } catch (e) {
            // ignore JSON parse error
        }
        return 'User email unavailable';
    };

    // Auto-load profile data when component mounts or profile prop changes (FEATURE 9)
    useEffect(() => {
        setFormData({ ...profile });
    }, [profile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Handle arrays (comma separated for dislikes/allergies)
        if (name === 'foodDislikes' || name === 'foodAllergies') {
            const arrValue = value.split(',').map(item => item.trim()).filter(Boolean);
            setFormData({ ...formData, [name]: arrValue });
            return;
        }

        // Handle numeric fields
        if (['age', 'height', 'weight', 'targetCalories', 'targetProtein', 'workoutDaysPerWeek'].includes(name)) {
            setFormData({ ...formData, [name]: value === '' ? undefined : Number(value) });
            return;
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        setIsSaving(true);
        setSaveMessage(null);
        try {
            const updatedProfile = { ...profile, ...formData } as UserProfile;
            await onUpdateProfile(updatedProfile);
            setSaveMessage("Profile updated successfully.");
            setTimeout(() => setSaveMessage(null), 3000); // Clear message after 3s
        } catch (error) {
            setSaveMessage("Failed to update profile.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleRegenerate = async () => {
        // First save any unsaved changes
        await handleSave();

        // Let the user know the plan will be generated on the dashboard
        setSaveMessage("Profile saved. Return to dashboard to see new plans.");
        setTimeout(() => setSaveMessage(null), 5000);

        // Depending on backend structure, resetting local storage flags for diet/workout regenerations
        // could go here, or handled within the parent components on render.
    };

    const getArrayString = (arr?: string[]) => {
        return arr ? arr.join(', ') : '';
    };

    const inputClasses = "w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all";
    const labelClasses = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";

    return (
        <div className="min-h-screen bg-transparent flex flex-col pt-8">
            {/* Back Navigation */}
            <div className="w-full max-w-4xl mx-auto px-6 mb-6">
                <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-fuchsia-500 transition-colors">
                    <ArrowLeft size={20} />
                    <span className="font-medium">Back to Dashboard</span>
                </Link>
            </div>

            <div className="flex-1 w-full max-w-4xl mx-auto px-6 pb-20 space-y-8">
                {/* Save message toast */}
                {saveMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg font-medium"
                    >
                        {saveMessage}
                    </motion.div>
                )}

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white dark:bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl flex items-center justify-between"
                >
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-500 flex items-center justify-center text-white font-display font-bold text-3xl shadow-lg shadow-fuchsia-500/20">
                            {profile.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-1">
                                {profile.name}
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">
                                {getUserEmail()}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Editable Constraints Form */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="bg-white dark:bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl"
                >
                    <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-8 border-b border-white/10 pb-4">
                        Fitness Constraints
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Metrics */}
                        <div>
                            <label className={labelClasses}>Age</label>
                            <input type="number" name="age" value={formData.age || ''} onChange={handleChange} className={inputClasses} />
                        </div>
                        <div>
                            <label className={labelClasses}>Gender</label>
                            <select name="gender" value={formData.gender || ''} onChange={handleChange} className={inputClasses}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelClasses}>Height (cm)</label>
                            <input type="number" name="height" value={formData.height || ''} onChange={handleChange} className={inputClasses} />
                        </div>
                        <div>
                            <label className={labelClasses}>Weight (kg)</label>
                            <input type="number" name="weight" value={formData.weight || ''} onChange={handleChange} className={inputClasses} />
                        </div>

                        {/* Activity & Goals */}
                        <div>
                            <label className={labelClasses}>Activity Level</label>
                            <select name="activityLevel" value={formData.activityLevel || ''} onChange={handleChange} className={inputClasses}>
                                <option value="sedentary">Sedentary</option>
                                <option value="light">Lightly Active</option>
                                <option value="moderate">Moderately Active</option>
                                <option value="active">Very Active</option>
                                <option value="very_active">Extra Active</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelClasses}>Fitness Goal</label>
                            <select name="goal" value={formData.goal || ''} onChange={handleChange} className={inputClasses}>
                                <option value="cutting">Fat Loss</option>
                                <option value="bulking">Muscle Gain</option>
                                <option value="maintenance">Maintenance</option>
                            </select>
                        </div>

                        {/* Diet Preferences */}
                        <div>
                            <label className={labelClasses}>Diet Preference</label>
                            <select name="dietPreference" value={formData.dietPreference || ''} onChange={handleChange} className={inputClasses}>
                                <option value="">No Preference</option>
                                <option value="Vegetarian">Vegetarian</option>
                                <option value="Vegetarian + Eggs">Vegetarian + Eggs</option>
                                <option value="Non-Vegetarian">Non-Vegetarian</option>
                                <option value="Vegan">Vegan</option>
                            </select>
                        </div>

                        {/* Target Overrides */}
                        <div>
                            <label className={labelClasses}>Workout Days Per Week</label>
                            <select name="workoutDaysPerWeek" value={formData.workoutDaysPerWeek || ''} onChange={handleChange} className={inputClasses}>
                                <option value="">Auto (Based on Goal)</option>
                                <option value="2">2 Days</option>
                                <option value="3">3 Days</option>
                                <option value="4">4 Days</option>
                                <option value="5">5 Days</option>
                                <option value="6">6 Days</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelClasses}>Target Calories (Optional)</label>
                            <input type="number" name="targetCalories" value={formData.targetCalories || ''} onChange={handleChange} className={inputClasses} placeholder="e.g. 2000" />
                        </div>
                        <div>
                            <label className={labelClasses}>Target Protein (Optional)</label>
                            <input type="number" name="targetProtein" value={formData.targetProtein || ''} onChange={handleChange} className={inputClasses} placeholder="e.g. 150" />
                        </div>

                        <div className="md:col-span-2">
                            <label className={labelClasses}>Food Dislikes (comma separated)</label>
                            <input type="text" name="foodDislikes" value={getArrayString(formData.foodDislikes)} onChange={handleChange} className={inputClasses} placeholder="e.g. broccoli, tofu" />
                        </div>
                        <div className="md:col-span-2">
                            <label className={labelClasses}>Food Allergies (comma separated)</label>
                            <input type="text" name="foodAllergies" value={getArrayString(formData.foodAllergies)} onChange={handleChange} className={inputClasses} placeholder="e.g. peanuts, dairy" />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 border-t border-white/10 pt-8">
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex-1 bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white font-medium py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <Save size={20} />
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>

                        <button
                            onClick={handleRegenerate}
                            disabled={isSaving}
                            className="flex-1 bg-slate-800 dark:bg-white/10 border border-slate-700 dark:border-white/20 text-white font-medium py-3 px-6 rounded-xl hover:bg-slate-700 dark:hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <RefreshCw size={20} />
                            Update & Regenerate Plan
                        </button>
                    </div>
                </motion.div>

                {/* Logout Section */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex justify-center pt-8"
                >
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-2 py-2 px-6 rounded-xl font-medium border border-red-500 text-red-400 hover:bg-red-500/10 hover:-translate-y-0.5 transition-all duration-200"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;
