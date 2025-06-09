import React from 'react';
import { useTheme } from '@/components/Hooks/themeHook';

const About: React.FC = () => {
    const { theme } = useTheme();

    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Image */}
            <div className="w-1/2 relative overflow-hidden">
                <img
                    src="/src/assets/profilePic/subbu_pic.jpg"
                    alt="Subbusainath"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50"></div>
            </div>

            {/* Right Panel - Content */}
            <div className={`w-1/2 flex items-center justify-center p-12 ${theme.name === 'light' ? 'bg-white' : 'bg-slate-900'}`}>
                <div className="max-w-lg space-y-8">
                    <div className="space-y-4">
                        {/* Badges Section */}
                        <div className="flex flex-wrap gap-3">
                            <span className={`${theme.buttons.primary.background} ${theme.buttons.primary.text} px-4 py-2 text-sm text-white font-bold rounded flex items-center justify-center`}>
                                SENIOR ENGINEER
                            </span>
                            <span className={`px-4 py-2 text-sm font-bold rounded border-2 ${theme.name === 'light'
                                ? 'bg-orange-500 text-white border-orange-600'
                                : 'bg-orange-400 text-slate-900 border-orange-500'
                                }`}>
                                🏗️ AWS COMMUNITY BUILDER
                            </span>
                        </div>
                        <h1 className={`text-6xl font-black ${theme.body.text} leading-tight`}>
                            Subbusainath
                        </h1>
                    </div>

                    <div className="space-y-6">
                        <p className={`text-lg ${theme.body.text} leading-relaxed opacity-80`}>
                            Cloud Architect building the infrastructure of tomorrow. <br />
                            From serverless innovation to scalable solutions. <br />
                            Passionate about cloud-native architectures and serverless technologies, <br />
                            I am an AWS Community Builder dedicated to sharing knowledge and driving <br />
                            innovation in the cloud ecosystem.
                        </p>

                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <div className={`w-2 h-2 rounded-full ${theme.buttons.primary.background}`}></div>
                                <span className={`text-lg ${theme.body.text} opacity-70`}>
                                    Cloud Architect
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className={`w-2 h-2 rounded-full ${theme.buttons.primary.background}`}></div>
                                <span className={`text-lg ${theme.body.text} opacity-70`}>
                                    Serverless Architect
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;