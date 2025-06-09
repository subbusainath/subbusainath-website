import React, { useState } from 'react';
import { useTheme } from '@/components/Hooks/themeHook';
import { useNotification } from '@/contexts/NotificationContext';
import { Mail, MapPin, Send, User, MessageSquare, AlertCircle } from 'lucide-react';

// Contact form data interface
interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

// Form validation errors interface
interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

const ContactMe: React.FC = () => {
    const { theme } = useTheme();
    const { showNotification } = useNotification();

    // Form state
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    // Form validation state
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    // Form validation function
    const validateForm = (): FormErrors => {
        const newErrors: FormErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Subject validation
        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        } else if (formData.subject.trim().length < 5) {
            newErrors.subject = 'Subject must be at least 5 characters';
        }

        // Message validation
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        return newErrors;
    };

    // Handle input changes
    const handleInputChange = (field: keyof ContactFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Clear error for this field when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    // Handle input blur (for showing validation errors)
    const handleInputBlur = (field: keyof ContactFormData) => {
        setTouched(prev => ({ ...prev, [field]: true }));

        // Validate just this field
        const newErrors = validateForm();
        setErrors(prev => ({ ...prev, [field]: newErrors[field] }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Mark all fields as touched
        setTouched({
            name: true,
            email: true,
            subject: true,
            message: true
        });

        // Validate form
        const formErrors = validateForm();
        setErrors(formErrors);

        // Check if form has errors
        if (Object.keys(formErrors).length > 0) {
            showNotification({
                message: 'Please fix the errors in the form before submitting.',
                type: 'error',
                duration: 5000
            });
            return;
        }

        // Start submission
        setIsSubmitting(true);

        try {
            // Simulate API call (replace with actual implementation)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Success notification
            showNotification({
                message: 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.',
                type: 'success',
                duration: 7000
            });

            // Reset form
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
            setTouched({});
            setErrors({});

        } catch {
            // Error notification
            showNotification({
                message: 'Sorry, there was an error sending your message. Please try again later.',
                type: 'error',
                duration: 5000
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Contact information data
    const contactInfo = [
        {
            icon: Mail,
            label: 'Email',
            value: 'enquiry@subbusainath.com',
            href: 'mailto:enquiry@subbusainath.com'
        },

        {
            icon: MapPin,
            label: 'Location',
            value: 'Chennai, TN',
            href: undefined
        }
    ];

    // Theme-based styling
    const cardBg = theme.name === 'light' ? 'bg-white' : 'bg-slate-800';
    const cardBorder = theme.name === 'light' ? 'border-slate-200' : 'border-slate-700';
    const inputBg = theme.name === 'light' ? 'bg-white' : 'bg-slate-700';
    const inputBorder = theme.name === 'light' ? 'border-slate-300' : 'border-slate-600';
    const inputFocus = theme.name === 'light' ? 'focus:border-cyan-500 focus:ring-cyan-500' : 'focus:border-cyan-400 focus:ring-cyan-400';
    const labelColor = theme.name === 'light' ? 'text-slate-700' : 'text-slate-300';
    const placeholderColor = theme.name === 'light' ? 'placeholder-slate-400' : 'placeholder-slate-500';

    return (
        <div className={`min-h-screen ${theme.name === 'light' ? 'bg-white' : 'bg-slate-900'} ${theme.body.text} transition-colors duration-300`}>
            <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-12 sm:mb-16">
                        <h1 className={`${theme.headings.main} mb-4 sm:mb-6`}>
                            Let's work together.
                        </h1>
                        <p className={`${theme.headings.sub} max-w-2xl mx-auto`}>
                            Get in touch today.
                        </p>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Contact Information Card */}
                        <div className={`${cardBg} ${cardBorder} border rounded-2xl p-6 sm:p-8 shadow-lg`}>
                            <h2 className={`text-2xl sm:text-3xl font-bold ${theme.name === 'light' ? 'text-slate-900' : 'text-slate-50'} mb-6`}>
                                Contact Information
                            </h2>
                            <p className={`${theme.name === 'light' ? 'text-slate-600' : 'text-slate-300'} mb-8 text-lg leading-relaxed`}>
                                Ready to bring your next project to life? Let's discuss how we can work together to build something amazing.
                            </p>

                            {/* Contact Details */}
                            <div className="space-y-6">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className="flex items-center group">
                                        <div className={`p-3 rounded-lg ${theme.name === 'light' ? 'bg-slate-100' : 'bg-slate-700'} mr-4 transition-colors duration-300 group-hover:${theme.name === 'light' ? 'bg-cyan-50' : 'bg-cyan-900'}`}>
                                            <info.icon className={`h-6 w-6 ${theme.name === 'light' ? 'text-cyan-600' : 'text-cyan-400'}`} />
                                        </div>
                                        <div>
                                            <p className={`text-sm font-medium ${theme.name === 'light' ? 'text-slate-500' : 'text-slate-400'} mb-1`}>
                                                {info.label}
                                            </p>
                                            {info.href ? (
                                                <a
                                                    href={info.href}
                                                    className={`text-lg font-medium ${theme.name === 'light' ? 'text-slate-900 hover:text-cyan-600' : 'text-slate-100 hover:text-cyan-400'} transition-colors duration-300`}
                                                >
                                                    {info.value}
                                                </a>
                                            ) : (
                                                <p className={`text-lg font-medium ${theme.name === 'light' ? 'text-slate-900' : 'text-slate-100'}`}>
                                                    {info.value}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact Form Card */}
                        <div className={`${cardBg} ${cardBorder} border rounded-2xl p-6 sm:p-8 shadow-lg`}>
                            <h2 className={`text-2xl sm:text-3xl font-bold ${theme.name === 'light' ? 'text-slate-900' : 'text-slate-50'} mb-6`}>
                                Send a Message
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label htmlFor="name" className={`block text-sm font-medium ${labelColor} mb-2`}>
                                        Full Name *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className={`h-5 w-5 ${theme.name === 'light' ? 'text-slate-400' : 'text-slate-500'}`} />
                                        </div>
                                        <input
                                            type="text"
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            onBlur={() => handleInputBlur('name')}
                                            className={`block w-full pl-10 pr-3 py-3 ${inputBg} ${inputBorder} border rounded-lg ${inputFocus} transition-colors duration-300 ${placeholderColor} focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    {touched.name && errors.name && (
                                        <div className="flex items-center mt-2 text-red-600">
                                            <AlertCircle className="h-4 w-4 mr-1" />
                                            <span className="text-sm">{errors.name}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className={`block text-sm font-medium ${labelColor} mb-2`}>
                                        Email Address *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className={`h-5 w-5 ${theme.name === 'light' ? 'text-slate-400' : 'text-slate-500'}`} />
                                        </div>
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            onBlur={() => handleInputBlur('email')}
                                            className={`block w-full pl-10 pr-3 py-3 ${inputBg} ${inputBorder} border rounded-lg ${inputFocus} transition-colors duration-300 ${placeholderColor} focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                    {touched.email && errors.email && (
                                        <div className="flex items-center mt-2 text-red-600">
                                            <AlertCircle className="h-4 w-4 mr-1" />
                                            <span className="text-sm">{errors.email}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Subject Field */}
                                <div>
                                    <label htmlFor="subject" className={`block text-sm font-medium ${labelColor} mb-2`}>
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        value={formData.subject}
                                        onChange={(e) => handleInputChange('subject', e.target.value)}
                                        onBlur={() => handleInputBlur('subject')}
                                        className={`block w-full px-3 py-3 ${inputBg} ${inputBorder} border rounded-lg ${inputFocus} transition-colors duration-300 ${placeholderColor} focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                                        placeholder="What's this about?"
                                    />
                                    {touched.subject && errors.subject && (
                                        <div className="flex items-center mt-2 text-red-600">
                                            <AlertCircle className="h-4 w-4 mr-1" />
                                            <span className="text-sm">{errors.subject}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Message Field */}
                                <div>
                                    <label htmlFor="message" className={`block text-sm font-medium ${labelColor} mb-2`}>
                                        Message *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute top-3 left-3 pointer-events-none">
                                            <MessageSquare className={`h-5 w-5 ${theme.name === 'light' ? 'text-slate-400' : 'text-slate-500'}`} />
                                        </div>
                                        <textarea
                                            id="message"
                                            rows={6}
                                            value={formData.message}
                                            onChange={(e) => handleInputChange('message', e.target.value)}
                                            onBlur={() => handleInputBlur('message')}
                                            className={`block w-full pl-10 pr-3 py-3 ${inputBg} ${inputBorder} border rounded-lg ${inputFocus} transition-colors duration-300 ${placeholderColor} focus:outline-none focus:ring-2 focus:ring-opacity-50 resize-none`}
                                            placeholder="Tell me about your project, goals, or any questions you have..."
                                        />
                                    </div>
                                    {touched.message && errors.message && (
                                        <div className="flex items-center mt-2 text-red-600">
                                            <AlertCircle className="h-4 w-4 mr-1" />
                                            <span className="text-sm">{errors.message}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`
                                        w-full flex items-center justify-center
                                        ${theme.buttons.primary.background} 
                                        ${theme.buttons.primary.text} 
                                        ${theme.buttons.primary.padding} 
                                        ${theme.buttons.primary.shape}
                                        ${!isSubmitting ? theme.buttons.primary.hoverBackground : ''}
                                        transition-all duration-300 ease-in-out
                                        text-lg font-medium
                                        disabled:opacity-60 disabled:cursor-not-allowed
                                        transform hover:scale-105 active:scale-95
                                        shadow-lg hover:shadow-xl
                                    `}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-5 w-5 mr-3" />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactMe; 