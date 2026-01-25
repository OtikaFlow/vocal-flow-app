import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ScrollReveal } from '../components/ui/scroll-reveal';
import emailjs from '@emailjs/browser';

// Lazy load BackgroundBeams for better initial load
const BackgroundBeams = lazy(() => import('../components/ui/aceternity/background-beams').then(module => ({ default: module.BackgroundBeams })));

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        prenom: '',
        nom: '',
        email: '',
        entreprise: '',
        telephone: '',
        secteur: '',
        volume: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [showBeams, setShowBeams] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        // Initialize EmailJS
        emailjs.init('95T11QBwqhjyeTuM-');

        // Load background beams after initial render
        const timer = setTimeout(() => setShowBeams(true), 100);
        return () => clearTimeout(timer);
    }, []);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // Prepare template parameters
            const templateParams = {
                prenom: formData.prenom,
                nom: formData.nom,
                email: formData.email,
                telephone: formData.telephone,
                entreprise: formData.entreprise,
                secteur: formData.secteur,
                volume: formData.volume,
                message: formData.message
            };

            console.log('📧 Sending email with params:', templateParams);

            // Send email using emailjs.send()
            const result = await emailjs.send(
                'service_nkreqt9',
                'template_nvjtis1',
                templateParams,
                '95T11QBwqhjyeTuM-'
            );

            console.log('✅ Email sent successfully:', result);
            setIsSubmitting(false);
            setSubmitStatus('success');
            setShowSuccessModal(true);
            setFormData({ prenom: '', nom: '', email: '', entreprise: '', telephone: '', secteur: '', volume: '', message: '' });

            // Auto-hide success modal after 5 seconds
            setTimeout(() => {
                setShowSuccessModal(false);
                setSubmitStatus('idle');
            }, 5000);
        } catch (error: any) {
            console.error('❌ Error sending email:', error);
            console.error('Error text:', error.text);
            console.error('Error status:', error.status);
            setIsSubmitting(false);
            setSubmitStatus('error');

            setTimeout(() => setSubmitStatus('idle'), 5000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div style={{ width: '100vw', minHeight: '100vh', backgroundColor: '#0F1C2E', overflowX: 'hidden' }}>

            {/* Success Modal */}
            {showSuccessModal && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
                    onClick={() => setShowSuccessModal(false)}
                >
                    <div
                        className="relative bg-gradient-to-br from-bg-100 to-bg-200 border border-primary-300/30 rounded-2xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(172,194,239,0.3)] animate-in zoom-in duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setShowSuccessModal(false)}
                            className="absolute top-4 right-4 text-text-200 hover:text-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Success Icon */}
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-500 delay-100">
                            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        {/* Title */}
                        <h3 className="font-display text-2xl font-bold text-white text-center mb-3">
                            Message Envoyé !
                        </h3>

                        {/* Description */}
                        <p className="text-text-200 text-center mb-6">
                            Merci pour votre message. Notre équipe vous répondra dans les <span className="text-primary-300 font-semibold">24 heures</span>.
                        </p>

                        {/* Action button */}
                        <Button
                            onClick={() => setShowSuccessModal(false)}
                            className="w-full"
                            size="lg"
                        >
                            PARFAIT !
                        </Button>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section className="relative w-full min-h-[60vh] flex items-center justify-center px-6 md:px-12 pt-32 pb-20">
                {showBeams && (
                    <Suspense fallback={null}>
                        <BackgroundBeams className="opacity-40" />
                    </Suspense>
                )}

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <ScrollReveal direction="down" duration={0.8}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-300/10 border border-primary-300/30 rounded-full mb-8">
                            <MessageSquare className="w-4 h-4 text-primary-300" />
                            <span className="font-tech text-xs text-primary-300 uppercase tracking-wider">Réponse sous 24h</span>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2} blur>
                        <h1 className="font-display font-bold text-5xl md:text-7xl text-white mb-6 leading-tight">
                            Parlons de Votre<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-accent-200">Projet Vocal</span>
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal delay={0.4} direction="up">
                        <p className="font-sans text-xl text-text-200 max-w-3xl mx-auto leading-relaxed">
                            Notre équipe est là pour vous accompagner. Démo personnalisée, conseil technique, ou simple question - nous sommes à votre écoute.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Contact Form + Info */}
            <section className="relative w-full py-24 px-6 md:px-12" style={{ backgroundColor: '#1f2b3e' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* Contact Form */}
                        <ScrollReveal direction="right" delay={0.2}>
                            <Card className="p-8 md:p-12">
                                <CardHeader className="px-0 pt-0">
                                    <CardTitle className="text-3xl">Envoyez-nous un Message</CardTitle>
                                    <CardDescription>Remplissez le formulaire et nous vous répondrons rapidement</CardDescription>
                                </CardHeader>

                                <CardContent className="px-0 pb-0">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block font-tech text-xs text-text-200 uppercase tracking-wider mb-2">
                                                    Prénom *
                                                </label>
                                                <Input
                                                    type="text"
                                                    name="prenom"
                                                    value={formData.prenom}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Jean"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-tech text-xs text-text-200 uppercase tracking-wider mb-2">
                                                    Nom *
                                                </label>
                                                <Input
                                                    type="text"
                                                    name="nom"
                                                    value={formData.nom}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Dupont"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block font-tech text-xs text-text-200 uppercase tracking-wider mb-2">
                                                Email Professionnel *
                                            </label>
                                            <Input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="jean.dupont@entreprise.com"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block font-tech text-xs text-text-200 uppercase tracking-wider mb-2">
                                                    Entreprise *
                                                </label>
                                                <Input
                                                    type="text"
                                                    name="entreprise"
                                                    value={formData.entreprise}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Acme Corp"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-tech text-xs text-text-200 uppercase tracking-wider mb-2">
                                                    Téléphone
                                                </label>
                                                <Input
                                                    type="tel"
                                                    name="telephone"
                                                    value={formData.telephone}
                                                    onChange={handleChange}
                                                    placeholder="+33 6 12 34 56 78"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block font-tech text-xs text-text-200 uppercase tracking-wider mb-2">
                                                    Secteur d'activité *
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        name="secteur"
                                                        value={formData.secteur}
                                                        onChange={handleChange}
                                                        required
                                                        className="w-full flex h-12 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300/50 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                                                    >
                                                        <option value="" disabled className="bg-bg-200 text-gray-400">Sélectionnez votre secteur</option>
                                                        <option value="health" className="bg-bg-200">Santé / Médical</option>
                                                        <option value="automotive" className="bg-bg-200">Automobile / Garage</option>
                                                        <option value="retail" className="bg-bg-200">Retail / Commerce</option>
                                                        <option value="legal" className="bg-bg-200">Juridique / Immobilier</option>
                                                        <option value="callcenter" className="bg-bg-200">Centre d'Appels</option>
                                                        <option value="other" className="bg-bg-200">Autre</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block font-tech text-xs text-text-200 uppercase tracking-wider mb-2">
                                                    Volume d'appels mensuel *
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        name="volume"
                                                        value={formData.volume}
                                                        onChange={handleChange}
                                                        required
                                                        className="w-full flex h-12 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300/50 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                                                    >
                                                        <option value="" disabled className="bg-bg-200 text-gray-400">Volume estimé</option>
                                                        <option value="<100" className="bg-bg-200">Moins de 100 appels</option>
                                                        <option value="100-500" className="bg-bg-200">100 - 500 appels</option>
                                                        <option value="500-2000" className="bg-bg-200">500 - 2 000 appels</option>
                                                        <option value=">2000" className="bg-bg-200">Plus de 2 000 appels</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block font-tech text-xs text-text-200 uppercase tracking-wider mb-2">
                                                Votre Message *
                                            </label>
                                            <Textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={6}
                                                placeholder="Décrivez votre projet, vos besoins, ou posez-nous vos questions..."
                                            />
                                        </div>

                                        {submitStatus === 'success' && (
                                            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-green-400 text-sm">
                                                ✓ Message envoyé avec succès ! Nous vous répondrons sous 24h.
                                            </div>
                                        )}

                                        {submitStatus === 'error' && (
                                            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm">
                                                ✗ Une erreur est survenue. Veuillez réessayer.
                                            </div>
                                        )}

                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full"
                                            size="lg"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-bg-100 border-t-transparent rounded-full animate-spin"></div>
                                                    ENVOI EN COURS...
                                                </>
                                            ) : (
                                                <>
                                                    ENVOYER LE MESSAGE
                                                    <Send className="w-5 h-5" />
                                                </>
                                            )}
                                        </Button>

                                        <p className="text-xs text-text-200 text-center">
                                            En soumettant ce formulaire, vous acceptez notre politique de confidentialité.
                                        </p>
                                    </form>
                                </CardContent>
                            </Card>
                        </ScrollReveal>

                        {/* Contact Info Cards */}
                        <div className="space-y-6">
                            {[
                                {
                                    icon: <Mail className="w-6 h-6" />,
                                    title: "Nous Contacter",
                                    desc: "contact@vocal-flow.fr",
                                    link: "mailto:contact@vocal-flow.fr",
                                    linkText: "Envoyer un email",
                                    delay: 0
                                },
                                {
                                    icon: <Clock className="w-6 h-6" />,
                                    title: "Horaires",
                                    desc: "Lun-Ven, 9h-18h (heure de Paris)",
                                    link: null,
                                    linkText: "",
                                    delay: 0.1
                                }
                            ].map((item, idx) => (
                                <ScrollReveal key={idx} direction="left" delay={item.delay}>
                                    <Card className="p-8 hover:shadow-[0_0_30px_rgba(172,194,239,0.15)]">
                                        <div className="w-12 h-12 bg-primary-300/10 rounded-lg flex items-center justify-center text-primary-300 mb-4">
                                            {item.icon}
                                        </div>
                                        {/* @ts-ignore */}
                                        <CardTitle className="mb-2">{item.title}</CardTitle>
                                        {/* @ts-ignore */}
                                        <CardDescription className="mb-3">{item.desc}</CardDescription>
                                        <a href={item.link} className="text-primary-300 hover:text-accent-200 transition-colors font-tech text-sm">
                                            {item.linkText}
                                        </a>
                                    </Card>
                                </ScrollReveal>
                            ))}

                            <ScrollReveal direction="left" delay={0.4}>
                                <Card className="p-8 bg-gradient-to-br from-primary-300/20 to-bg-100 border-primary-300/50">
                                    <div className="w-12 h-12 bg-primary-300/20 rounded-lg flex items-center justify-center text-primary-300 mb-4">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <CardTitle className="mb-2">Temps de Réponse</CardTitle>
                                    <CardDescription className="mb-4">Nous nous engageons à vous répondre rapidement</CardDescription>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-text-200">Email:</span>
                                            <span className="text-primary-300 font-tech">&lt; 24h</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-text-200">Téléphone:</span>
                                            <span className="text-primary-300 font-tech">Immédiat</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-text-200">Support technique:</span>
                                            <span className="text-primary-300 font-tech">&lt; 4h</span>
                                        </div>
                                    </div>
                                </Card>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Use Cases Quick Links */}
            <section className="relative w-full py-24 px-6 md:px-12" style={{ backgroundColor: '#0F1C2E' }}>
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-display font-bold text-4xl text-white mb-4">
                            Besoin Spécifique ?
                        </h2>
                        <p className="text-text-200 text-lg">
                            Sélectionnez le sujet qui vous concerne
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: <MessageSquare className="w-6 h-6" />, title: 'Demande de Démo', desc: 'Voir Vocal Flow en action' },
                            { icon: <Phone className="w-6 h-6" />, title: 'Support Technique', desc: 'Aide sur l\'intégration' },
                            { icon: <Mail className="w-6 h-6" />, title: 'Partenariat', desc: 'Devenir partenaire' },
                            { icon: <ArrowRight className="w-6 h-6" />, title: 'Autre Demande', desc: 'Question générale' }
                        ].map((item, idx) => (
                            <ScrollReveal key={idx} delay={idx * 0.1} direction="up">
                                <Card
                                    className="p-6 cursor-pointer hover:-translate-y-1"
                                >
                                    <div className="w-10 h-10 bg-primary-300/10 rounded-lg flex items-center justify-center text-primary-300 mb-4 group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <CardTitle className="text-lg mb-1">{item.title}</CardTitle>
                                    <CardDescription>{item.desc}</CardDescription>
                                </Card>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative w-full py-32 px-6 bg-gradient-to-b from-bg-200 to-bg-100 border-t border-white/5">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[100px]" style={{ backgroundColor: 'rgba(172, 194, 239, 0.1)' }}></div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <h2 className="font-display font-bold text-4xl md:text-6xl text-white mb-8">
                        Prêt à Transformer<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-accent-200">Vos Interactions Vocales</span> ?
                    </h2>

                    <p className="font-sans text-text-200 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
                        Rejoignez les entreprises qui font confiance à Vocal Flow pour automatiser et améliorer leur expérience client vocale.
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center">
                        <Button size="lg" asChild>
                            <a href="/tarification">
                                VOIR LES TARIFS
                            </a>
                        </Button>
                        <Button variant="outline" size="lg" asChild>
                            <a href="/installation">
                                DOCUMENTATION
                            </a>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
