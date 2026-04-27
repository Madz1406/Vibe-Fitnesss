import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, CheckCircle2 } from 'lucide-react';
import { UserState } from '../../types';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface WeeklyReportProps {
    state: UserState;
}

const WeeklyReport: React.FC<WeeklyReportProps> = ({ state }) => {
    // Mock data calculations for the week based on state where possible
    const workoutsCompleted = state.dailyTasks.find(t => t.id === '2')?.completed ? 1 : 0; // Just simulating based on today
    const targetWorkouts = 5;
    const proteinAchieved = state.dailyTasks.find(t => t.id === '1')?.completed ? 1 : 0;
    const targetProtein = 7;

    const weightChange = state.weightHistory && state.weightHistory.length >= 2
        ? state.weightHistory[state.weightHistory.length - 1].weight - state.weightHistory[0].weight
        : 0;

    // Rough score based on today's completion
    const completedTasks = state.dailyTasks.filter(t => t.completed).length;
    const consistencyScore = Math.round((completedTasks / state.dailyTasks.length) * 100);

    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        // Theme colors
        const primaryColor: [number, number, number] = [217, 70, 239]; // Fuchsia-500

        // Header
        doc.setFontSize(24);
        doc.setTextColor(...primaryColor);
        doc.text('Vibe Fitness', 14, 20);

        doc.setFontSize(16);
        doc.setTextColor(50, 50, 50);
        doc.text('Weekly Performance Report', 14, 30);

        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 38);

        doc.setDrawColor(200, 200, 200);
        doc.line(14, 42, 196, 42);

        // Summary Section
        doc.setFontSize(14);
        doc.setTextColor(...primaryColor);
        doc.text('Summary', 14, 52);

        doc.setFontSize(11);
        doc.setTextColor(50, 50, 50);
        doc.text(`Workouts Completed: ${workoutsCompleted} / ${targetWorkouts}`, 14, 62);
        doc.text(`Protein Goal Achievements: ${proteinAchieved} / ${targetProtein} days`, 14, 70);
        doc.text(`Weight Change: ${weightChange > 0 ? '+' : ''}${weightChange.toFixed(1)} kg`, 14, 78);
        doc.text(`Overall Consistency Score: ${consistencyScore}%`, 14, 86);

        // AI Recommendations Section
        doc.setFontSize(14);
        doc.setTextColor(...primaryColor);
        doc.text('AI Recommendations', 14, 100);

        doc.setFontSize(10);
        doc.setTextColor(50, 50, 50);
        const recomendations = [
            "Keep consistent with your hydration goal.",
            "Try to sneak in a high protein snack pre-workout.",
            "Your current weight trend aligns with your goals, maintain this routine."
        ];
        let yPos = 110;
        recomendations.forEach(rec => {
            doc.text(`• ${rec}`, 14, yPos);
            yPos += 8;
        });

        // Table Data
        doc.setFontSize(14);
        doc.setTextColor(...primaryColor);
        doc.text('This Week\'s Log', 14, yPos + 10);

        const tableData = [
            [new Date().toLocaleDateString(), `${state.profile?.weight || '-'} kg`, workoutsCompleted > 0 ? 'Yes' : 'No', proteinAchieved > 0 ? 'Yes' : 'No']
        ];

        autoTable(doc, {
            startY: yPos + 15,
            head: [['Date', 'Weight', 'Workout Completed', 'Protein Goal']],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: primaryColor }
        });

        doc.save('Vibe_Fitness_Weekly_Report.pdf');
    };

    return (
        <motion.div
            id="weekly-report"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl scroll-mt-24"
        >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-xl font-display font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <FileText size={24} className="text-cyan-500" /> Weekly Report
                </h2>
                <button
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white rounded-lg font-medium shadow-md shadow-fuchsia-500/20 hover:scale-105 transition-all duration-300"
                >
                    <Download size={18} />
                    <span>Download PDF</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-50 dark:bg-black/20 rounded-xl p-4 border border-slate-100 dark:border-white/5">
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Workouts</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{workoutsCompleted} / {targetWorkouts}</p>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${(workoutsCompleted / targetWorkouts) * 100}%` }}></div>
                    </div>
                </div>

                <div className="bg-slate-50 dark:bg-black/20 rounded-xl p-4 border border-slate-100 dark:border-white/5">
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Protein Goal</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{proteinAchieved} / {targetProtein} days</p>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-fuchsia-500 rounded-full" style={{ width: `${(proteinAchieved / targetProtein) * 100}%` }}></div>
                    </div>
                </div>

                <div className="bg-slate-50 dark:bg-black/20 rounded-xl p-4 border border-slate-100 dark:border-white/5">
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Weight Change</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} kg</p>
                    <p className="text-xs text-slate-400">Since start of week</p>
                </div>

                <div className="bg-slate-50 dark:bg-black/20 rounded-xl p-4 border border-slate-100 dark:border-white/5 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-cyan-500/5"></div>
                    <CheckCircle2 size={32} className="text-emerald-500 mb-2" />
                    <p className="text-3xl font-black text-transparent bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text">
                        {consistencyScore}%
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium tracking-wide uppercase">Consistency</p>
                </div>
            </div>
        </motion.div>
    );
};

export default WeeklyReport;
