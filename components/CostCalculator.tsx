import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Users, ArrowRight, Sparkles, Clock, Zap, Euro } from 'lucide-react';
import { ScrollReveal } from './ui/scroll-reveal';

interface CalculatorResult {
    pack: string;
    callsPerDay: number;
    avgDuration: number;
    monthlyMinutes: number;
    ratePerMinute: number;
    monthlySubscription: number;
    humanCostEquivalent: number;
    savingsAmount: number;
    savingsPercentage: number;
    numberOfEmployees: number;
}

const CostCalculator: React.FC = () => {
    const [callsPerDay, setCallsPerDay] = useState<number>(20);
    const [avgDuration, setAvgDuration] = useState<number>(3);
    const [result, setResult] = useState<CalculatorResult | null>(null);

    const calculateCost = () => {
        const monthlyMinutes = callsPerDay * avgDuration * 30;

        let pack = '';
        let ratePerMinute = 0;

        if (callsPerDay <= 3) {
            pack = 'STARTER';
            ratePerMinute = 0.50;
        } else if (callsPerDay <= 10) {
            pack = 'GROWTH';
            ratePerMinute = 0.40;
        } else if (callsPerDay <= 30) {
            pack = 'SCALE';
            ratePerMinute = 0.30;
        } else {
            pack = 'ENTERPRISE';
            ratePerMinute = 0.26; // Average of 0.22-0.30€
        }

        const monthlySubscription = monthlyMinutes * ratePerMinute;

        let humanCostEquivalent = 0;
        const totalMonthlyHours = monthlyMinutes / 60;

        // Calcul réaliste du coût d'un employé humain
        // Un employé à temps plein (35h/semaine) = ~150h/mois
        // Coût réel employé (salaire + charges + formation + management) = ~3500€/mois minimum

        const hoursPerEmployee = 150; // Heures productives par mois
        const costPerEmployee = 3500; // Coût total chargé par employé

        if (totalMonthlyHours <= 40) {
            // Temps partiel ou freelance
            humanCostEquivalent = Math.max(1500, totalMonthlyHours * 35);
        } else if (totalMonthlyHours <= 150) {
            // 1 employé temps plein
            humanCostEquivalent = costPerEmployee;
        } else {
            // Plusieurs employés nécessaires
            const numberOfEmployees = Math.ceil(totalMonthlyHours / hoursPerEmployee);
            humanCostEquivalent = numberOfEmployees * costPerEmployee;
        }

        const savingsAmount = humanCostEquivalent - monthlySubscription;
        const savingsPercentage = (savingsAmount / humanCostEquivalent) * 100;

        // Calcul du nombre d'employés équivalents (using hoursPerEmployee from above)
        const numberOfEmployees = Math.ceil(totalMonthlyHours / hoursPerEmployee);

        setResult({
            pack,
            callsPerDay,
            avgDuration,
            monthlyMinutes,
            ratePerMinute,
            monthlySubscription,
            humanCostEquivalent,
            savingsAmount,
            savingsPercentage,
            numberOfEmployees
        });
    };

    useEffect(() => {
        if (callsPerDay > 0 && avgDuration > 0) {
            calculateCost();
        }
    }, [callsPerDay, avgDuration]);

    const getPackGradient = (pack: string) => {
        switch (pack) {
            case 'STARTER': return 'from-[#5B8DEF] to-[#0F52BA]';
            case 'GROWTH': return 'from-[#ACC2EF] to-[#7FA8E8]';
            case 'SCALE': return 'from-[#FF6B6B] to-[#EE5A6F]';
            case 'ENTERPRISE': return 'from-[#A78BFA] to-[#7C3AED]';
            default: return 'from-[#ACC2EF] to-[#7FA8E8]';
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto">
            <ScrollReveal>
                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#ACC2EF]/10 border border-[#ACC2EF]/30 rounded-full mb-8 backdrop-blur-sm">
                        <Calculator className="w-5 h-5 text-[#ACC2EF]" />
                        <span className="font-tech text-sm text-[#ACC2EF] uppercase tracking-wider">Simulateur Intelligent</span>
                    </div>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
                        Calculez Votre<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ACC2EF] to-white">Investissement</span>
                    </h2>
                    <p className="text-[#8B9DC3] text-sm sm:text-base md:text-base lg:text-xl max-w-2xl mx-auto">
                        Estimation précise et transparente en temps réel
                    </p>
                </div>

                {/* Main Calculator */}
                <div className="relative">
                    {/* Animated background glow */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-[#ACC2EF]/20 via-[#FF6B6B]/20 to-[#A78BFA]/20 rounded-[2rem] blur-3xl opacity-50 animate-pulse"></div>

                    <div className="relative bg-gradient-to-br from-[#1C2A3A]/90 to-[#0F1C2E]/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
                        {/* Top decorative line */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ACC2EF] to-transparent"></div>
                        <div className="p-6 md:p-12 lg:p-16">
                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                                {/* LEFT COLUMN: Controls (2/5) */}
                                <div className="lg:col-span-2 space-y-10">
                                    <div>
                                        <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-white mb-2">
                                            Votre Activité
                                        </h3>
                                        <p className="text-[#8B9DC3] text-xs md:text-sm">Configurez vos paramètres</p>
                                    </div>

                                    {/* Calls per day */}
                                    <div className="space-y-5">
                                        <div className="flex items-center justify-between">
                                            <label className="font-display text-white text-lg">Appels par jour</label>
                                            <div className="px-4 py-2 bg-[#ACC2EF]/10 border border-[#ACC2EF]/30 rounded-xl">
                                                <span className="font-display font-bold text-3xl text-[#ACC2EF]">{callsPerDay}</span>
                                            </div>
                                        </div>
                                        <input
                                            type="range"
                                            min="1"
                                            max="200"
                                            value={callsPerDay}
                                            onChange={(e) => setCallsPerDay(Number(e.target.value))}
                                            className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-[#ACC2EF] [&::-webkit-slider-thumb]:to-[#7FA8E8] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(172,194,239,0.6)] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white/20"
                                            style={{
                                                background: `linear-gradient(to right, #ACC2EF ${(callsPerDay / 200) * 100}%, rgba(255,255,255,0.05) ${(callsPerDay / 200) * 100}%)`
                                            }}
                                        />
                                        <div className="flex justify-between text-xs text-[#8B9DC3]">
                                            <span>1</span>
                                            <span>200+</span>
                                        </div>
                                    </div>

                                    {/* Average duration */}
                                    <div className="space-y-5">
                                        <div className="flex items-center justify-between">
                                            <label className="font-display text-white text-lg">Durée moyenne</label>
                                            <div className="px-4 py-2 bg-[#FF6B6B]/10 border border-[#FF6B6B]/30 rounded-xl">
                                                <span className="font-display font-bold text-3xl text-[#FF6B6B]">{avgDuration}</span>
                                                <span className="text-[#8B9DC3] text-sm ml-1">min</span>
                                            </div>
                                        </div>
                                        <input
                                            type="range"
                                            min="1"
                                            max="15"
                                            step="0.5"
                                            value={avgDuration}
                                            onChange={(e) => setAvgDuration(Number(e.target.value))}
                                            className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-[#FF6B6B] [&::-webkit-slider-thumb]:to-[#EE5A6F] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(255,107,107,0.6)] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white/20"
                                            style={{
                                                background: `linear-gradient(to right, #FF6B6B ${(avgDuration / 15) * 100}%, rgba(255,255,255,0.05) ${(avgDuration / 15) * 100}%)`
                                            }}
                                        />
                                        <div className="flex justify-between text-xs text-[#8B9DC3]">
                                            <span>1 min</span>
                                            <span>15 min</span>
                                        </div>
                                    </div>

                                    {/* Pack indicator */}
                                    {result && (
                                        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${getPackGradient(result.pack)} p-[2px]`}>
                                            <div className="bg-[#0F1C2E] rounded-2xl p-6">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getPackGradient(result.pack)} flex items-center justify-center`}>
                                                        <Sparkles className="w-7 h-7 text-white" />
                                                    </div>
                                                    <div>
                                                        <div className="text-[#8B9DC3] text-xs uppercase tracking-wider mb-1">Votre Pack</div>
                                                        <div className="font-display font-bold text-white text-2xl">Pack {result.pack}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* RIGHT COLUMN: Results (3/5) */}
                                <div className="lg:col-span-3">
                                    {result && (
                                        <div className="h-full flex flex-col gap-6">
                                            {/* Monthly subscription - HERO */}
                                            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#ACC2EF]/20 to-[#7FA8E8]/10 border-2 border-[#ACC2EF]/30 p-10">
                                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#ACC2EF]/10 rounded-full blur-3xl"></div>
                                                <div className="relative">
                                                    <div className="flex items-center gap-3 mb-6">
                                                        <TrendingUp className="w-6 h-6 text-[#ACC2EF]" />
                                                        <span className="font-tech text-sm text-[#ACC2EF] uppercase tracking-wider">Abonnement Mensuel</span>
                                                    </div>
                                                    <div className="font-display font-bold text-5xl sm:text-6xl md:text-7xl text-white mb-3">
                                                        {Math.round(result.monthlySubscription)}€
                                                        <span className="text-xl sm:text-2xl md:text-2xl text-[#8B9DC3]">/mois</span>
                                                    </div>
                                                    <p className="text-[#8B9DC3] text-sm">Maintenance + Crédits IA inclus</p>

                                                    {/* Details grid */}
                                                    <div className="grid grid-cols-2 gap-4 mt-8">
                                                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <Clock className="w-4 h-4 text-[#ACC2EF]" />
                                                                <span className="text-[#8B9DC3] text-xs">Minutes/mois</span>
                                                            </div>
                                                            <div className="font-display font-bold text-2xl text-white">{result.monthlyMinutes}</div>
                                                        </div>
                                                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <Euro className="w-4 h-4 text-[#ACC2EF]" />
                                                                <span className="text-[#8B9DC3] text-xs">Tarif/minute</span>
                                                            </div>
                                                            <div className="font-display font-bold text-2xl text-white">{result.ratePerMinute.toFixed(2)}€</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Savings comparison */}
                                            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500/10 to-emerald-600/5 border-2 border-green-400/30 p-8">
                                                <div className="flex items-start justify-between mb-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 rounded-xl bg-green-400/20 flex items-center justify-center">
                                                            <Users className="w-6 h-6 text-green-400" />
                                                        </div>
                                                        <div>
                                                            <div className="font-display font-bold text-white text-lg">vs Employé Humain</div>
                                                            <div className="text-green-400 text-sm font-semibold">Vous économisez !</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Employee count badge */}
                                                <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                                                    <Users className="w-4 h-4 text-[#ACC2EF]" />
                                                    <span className="text-white text-sm">
                                                        <span className="font-bold text-[#ACC2EF]">{result.numberOfEmployees}</span> employé{result.numberOfEmployees > 1 ? 's' : ''} équivalent{result.numberOfEmployees > 1 ? 's' : ''}
                                                    </span>
                                                </div>

                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-baseline">
                                                        <span className="text-[#8B9DC3] text-sm">Coût employé humain</span>
                                                        <span className="font-display font-bold text-xl text-white/40 line-through">
                                                            {result.humanCostEquivalent.toFixed(0)}€
                                                        </span>
                                                    </div>

                                                    <div className="flex justify-between items-baseline">
                                                        <span className="text-[#8B9DC3] text-sm">VocalFlow</span>
                                                        <span className="font-display font-bold text-xl text-[#ACC2EF]">
                                                            {Math.round(result.monthlySubscription)}€
                                                        </span>
                                                    </div>

                                                    <div className="bg-green-400/10 rounded-2xl p-5 border border-green-400/20 mt-4">
                                                        <div className="flex items-baseline justify-between mb-2">
                                                            <span className="font-display font-bold text-white text-sm md:text-base">💰 Économie mensuelle</span>
                                                            <span className="font-display font-bold text-2xl md:text-4xl text-green-400">
                                                                {result.savingsAmount.toFixed(0)}€
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                                                <div
                                                                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                                                                    style={{ width: `${Math.min(result.savingsPercentage, 100)}%` }}
                                                                ></div>
                                                            </div>
                                                            <span className="text-green-400 font-bold text-sm">{result.savingsPercentage.toFixed(0)}%</span>
                                                        </div>
                                                        <p className="text-green-400/80 text-xs mt-2">Soit {(result.savingsAmount * 12).toFixed(0)}€ d'économies par an</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* CTA */}
                                            <a
                                                href="/contact"
                                                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#ACC2EF] to-[#7FA8E8] p-[2px] hover:scale-[1.02] transition-transform duration-300"
                                            >
                                                <div className="bg-gradient-to-r from-[#ACC2EF] to-[#7FA8E8] rounded-2xl px-8 py-5 flex items-center justify-center gap-3">
                                                    <span className="font-display font-bold text-[#0F1C2E] text-lg">DEMANDER UNE DÉMO</span>
                                                    <ArrowRight className="w-6 h-6 text-[#0F1C2E] group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
};

export default CostCalculator;
