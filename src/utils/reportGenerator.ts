import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { UserProfile, WeightEntry, MacroBreakdown } from '../types';

export const generateFitnessReport = (
    profile: UserProfile,
    weightHistory: WeightEntry[],
    macros: MacroBreakdown | null
) => {
    const doc = new jsPDF();

    // Color Palette
    const neonCyan = [34, 211, 238];
    const slate900 = [15, 23, 42];

    // Header
    doc.setFillColor(slate900[0], slate900[1], slate900[2]);
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('VIBE FITNESS REPORT', 105, 25, { align: 'center' });

    // Profile Summary
    doc.setTextColor(slate900[0], slate900[1], slate900[2]);
    doc.setFontSize(16);
    doc.text('Profile Overview', 14, 55);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const profileData = [
        ['Age', `${profile.age} years`],
        ['Height', `${profile.height} cm`],
        ['Current Weight', `${profile.weight} kg`],
        ['Goal', profile.goal.toUpperCase()],
        ['Activity Level', profile.activityLevel.replace('_', ' ')],
    ];

    autoTable(doc, {
        startY: 60,
        head: [['Attribute', 'Value']],
        body: profileData,
        theme: 'striped',
        headStyles: { fillColor: neonCyan as [number, number, number] },
    });

    // Macros Summary
    if (macros) {
        doc.setFontSize(16);
        doc.text('Daily Nutrition Goals', 14, (doc as any).lastAutoTable.finalY + 15);

        const macroData = [
            ['Calories', `${macros.calories} kcal`],
            ['Protein', `${macros.protein} g`],
            ['Carbohydrates', `${macros.carbs} g`],
            ['Fats', `${macros.fats} g`],
        ];

        autoTable(doc, {
            startY: (doc as any).lastAutoTable.finalY + 20,
            head: [['Macro', 'Target']],
            body: macroData,
            theme: 'grid',
            headStyles: { fillColor: neonCyan as [number, number, number] },
        });
    }

    // Weight History Table
    doc.setFontSize(16);
    doc.text('Weight Progress History', 14, (doc as any).lastAutoTable.finalY + 15);

    const historyData = weightHistory.map((entry, index) => {
        const dateStr = new Date(entry.date).toLocaleDateString();
        let changeStr = '-';

        if (index > 0) {
            const previousWeight = weightHistory[index - 1].weight;
            const diff = entry.weight - previousWeight;
            if (diff > 0) {
                changeStr = `+${diff.toFixed(1)} kg`;
            } else if (diff < 0) {
                changeStr = `${diff.toFixed(1)} kg`;
            } else {
                changeStr = '0.0 kg';
            }
        }

        return [dateStr, `${entry.weight} kg`, changeStr];
    });

    autoTable(doc, {
        startY: (doc as any).lastAutoTable.finalY + 20,
        head: [['Date', 'Weight', 'Change from Previous']],
        body: historyData,
        theme: 'striped',
        headStyles: { fillColor: neonCyan as [number, number, number] },
    });

    // Footer / Disclaimer
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text('Vibe Fitness - Personal Progress Report', 105, 285, { align: 'center' });
        doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: 'center' });
    }

    // Medical Disclaimer
    doc.setFontSize(8);
    doc.text('Disclaimer: Consult a medical professional before starting any new diet or exercise program.', 14, 275);

    doc.save(`Vibe_Fitness_Report_${new Date().toISOString().split('T')[0]}.pdf`);
};

export const generateDietPlanPDF = (dietPlan: any) => {
    const doc = new jsPDF();
    const neonCyan = [34, 211, 238];
    const slate900 = [15, 23, 42];

    doc.setFillColor(slate900[0], slate900[1], slate900[2]);
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Vibe Fitness Diet Plan', 105, 25, { align: 'center' });

    doc.setTextColor(slate900[0], slate900[1], slate900[2]);
    
    // Summary Section
    if (dietPlan.summary) {
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('User Goal & Overview', 14, 55);
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Daily Calories: ${dietPlan.summary.totalCalories} kcal`, 14, 65);
        doc.text(`Protein: ${dietPlan.summary.protein?.grams || 0}g | Carbs: ${dietPlan.summary.carbs?.grams || 0}g | Fats: ${dietPlan.summary.fats?.grams || 0}g`, 14, 72);
        
        // Wrap strategy text
        const splitText = doc.splitTextToSize(dietPlan.summary.explanation || '', 180);
        doc.text(splitText, 14, 82);
    }
    
    let currentY = 82 + ((dietPlan.summary?.explanation?.length || 0) / 100) * 8 + 10;
    if (currentY < 100) currentY = 110;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Meal Plan', 14, currentY);
    currentY += 10;

    if (dietPlan.meals) {
        const mealTimes = ['breakfast', 'mid_morning_snack', 'lunch', 'evening_snack', 'dinner'];
        
        mealTimes.forEach((mealTime) => {
            if (!dietPlan.meals[mealTime] || dietPlan.meals[mealTime].length === 0) return;
            
            const mealGroup = dietPlan.meals[mealTime];
            const title = mealTime.split('_').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            
            const tableData: any[][] = [];
            mealGroup.forEach((option: any, index: number) => {
                const itemsStr = option.items ? option.items.join('\n') : '';
                tableData.push([
                    `Option ${index + 1}: ${option.name}`,
                    itemsStr,
                    `${option.calories} kcal`,
                    `${option.protein}g`
                ]);
            });

            autoTable(doc, {
                startY: currentY,
                head: [[title, 'Food Items', 'Calories', 'Protein']],
                body: tableData,
                theme: 'striped',
                headStyles: { fillColor: neonCyan as [number, number, number], textColor: 0 },
                styles: { cellPadding: 3, fontSize: 9 },
                columnStyles: {
                    0: { cellWidth: 50 },
                    1: { cellWidth: 80 },
                    2: { cellWidth: 25 },
                    3: { cellWidth: 25 }
                }
            });
            
            currentY = (doc as any).lastAutoTable.finalY + 10;
        });
    }

    doc.save('diet-plan.pdf');
};

export const generateWorkoutPlanPDF = (workoutPlan: any) => {
    const doc = new jsPDF();
    const neonCyan = [34, 211, 238];
    const slate900 = [15, 23, 42];

    doc.setFillColor(slate900[0], slate900[1], slate900[2]);
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Vibe Fitness Workout Plan', 105, 25, { align: 'center' });

    doc.setTextColor(slate900[0], slate900[1], slate900[2]);
    
    // Overview Section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Program Overview', 14, 55);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Goal: ${(workoutPlan.goal || '').replace(/_/g, ' ')}`, 14, 65);
    doc.text(`Fitness Level: ${workoutPlan.fitnessLevel || 'Beginner'}`, 14, 72);
    doc.text(`Duration: ${workoutPlan.duration || '8 weeks'}`, 14, 79);
    doc.text(`Frequency: ${workoutPlan.frequency || 3} days/week`, 14, 86);
    
    let currentY = 100;
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Weekly Split', 14, currentY);
    currentY += 10;

    if (workoutPlan.weeklySchedule) {
        const tableData: any[][] = [];
        
        Object.entries(workoutPlan.weeklySchedule).forEach(([day, dayPlan]: [string, any]) => {
            const dayNameCaps = day.charAt(0).toUpperCase() + day.slice(1);
            if (!dayPlan.exercises || dayPlan.exercises.length === 0) {
                tableData.push([dayNameCaps, dayPlan.name || 'Rest Day', '-', '-', '-']);
                return;
            }
            
            dayPlan.exercises.forEach((ex: any, idx: number) => {
                if (idx === 0) {
                    tableData.push([
                        { rowSpan: dayPlan.exercises.length, content: dayNameCaps + '\n(' + dayPlan.name + ')' },
                        ex.name || '-',
                        ex.sets ? ex.sets.toString() : '-',
                        ex.reps ? ex.reps.toString() : '-',
                        ex.duration || ex.rest || '-'
                    ]);
                } else {
                    tableData.push([
                        ex.name || '-',
                        ex.sets ? ex.sets.toString() : '-',
                        ex.reps ? ex.reps.toString() : '-',
                        ex.duration || ex.rest || '-'
                    ]);
                }
            });
        });

        autoTable(doc, {
            startY: currentY,
            head: [['Day', 'Exercise', 'Sets', 'Reps', 'Rest']],
            body: tableData,
            theme: 'striped',
            headStyles: { fillColor: neonCyan as [number, number, number], textColor: 0 },
            styles: { cellPadding: 3, fontSize: 10, valign: 'middle' },
        });
    }

    doc.save('workout-plan.pdf');
};
