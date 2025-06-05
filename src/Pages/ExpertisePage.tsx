import React, { useState } from 'react';
import { useTheme } from '../components/Hooks/themeHook';
import { ServerStackIcon, BoltIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

interface ExpertiseBlockProps {
    title: string;
    description: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    alignShape: 'left' | 'right';
    themeColors: {
        cardBg: string;
        textColor: string;
        titleColor: string;
        descriptionColor: string;
        accentColor: string;
    };
    isPopped: boolean;
    onSetPopped: () => void;
    onClearPopped: () => void;
}

const HeroIconDisplay: React.FC<{
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    themeColors: ExpertiseBlockProps['themeColors'];
    currentThemeName: 'light' | 'dark';
}> = ({ icon: IconComponent, themeColors, currentThemeName }) => {
    const iconStylingClasses = `h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 ${themeColors.accentColor}`;
    const backgroundClasses = currentThemeName === 'light' ? 'bg-slate-200' : 'bg-slate-700';

    return (
        <div className={`p-4 rounded-lg ${backgroundClasses} flex justify-center items-center`}>
            <IconComponent className={iconStylingClasses} aria-hidden="true" />
        </div>
    );
};

const ExpertiseBlock: React.FC<ExpertiseBlockProps> = ({
    title,
    description,
    icon,
    alignShape,
    themeColors,
    isPopped,
    onSetPopped,
    onClearPopped
}) => {
    const { theme } = useTheme();
    const textAlignmentClass = alignShape === 'right' ? 'md:text-left' : 'md:text-right';

    const transformingContentBaseClasses = `rounded-2xl animated-gradient-border-container transition-all duration-300 ease-in-out shadow-lg`;
    const transformingContentTransform = isPopped ? 'scale(1.2)' : 'scale(1)';
    const transformingContentZIndex = isPopped ? 'z-50' : 'z-20';

    const transformingContentClasses = `${transformingContentBaseClasses} ${theme.name === 'light' ? 'gradient-border-light' : 'gradient-border-dark'}`;

    const innerContentLayoutClasses = `card-content-inner p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center gap-6 sm:gap-10 min-h-[250px] md:min-h-[300px] ${themeColors.cardBg}`;
    const gridLayoutClasses = `md:grid md:grid-cols-2 md:items-center md:gap-12 lg:gap-16`;
    const textContentClasses = `space-y-3 text-center ${textAlignmentClass} max-w-md`;
    const textOrderClass = alignShape === 'left' ? 'md:order-2' : 'md:order-1';
    const iconContainerClasses = `flex justify-center items-center w-full md:w-auto`;
    const iconOrderClass = alignShape === 'left' ? 'md:order-1' : 'md:order-2';

    return (
        <div
            onMouseEnter={onSetPopped}
            onMouseLeave={onClearPopped}
            className="relative"
        >
            <div
                className={`${transformingContentClasses} ${transformingContentZIndex}`}
                style={{ transform: transformingContentTransform }}
            >
                <div className={`${innerContentLayoutClasses} ${gridLayoutClasses}`}>
                    <div className={`${textContentClasses} ${textOrderClass}`}>
                        <h2 className={`text-xl sm:text-2xl lg:text-3xl font-semibold ${themeColors.titleColor}`}>
                            {title}
                        </h2>
                        <p className={`text-sm sm:text-base lg:text-lg leading-relaxed ${themeColors.descriptionColor}`}>
                            {description}
                        </p>
                    </div>
                    <div className={`${iconContainerClasses} ${iconOrderClass}`}>
                        <HeroIconDisplay icon={icon} themeColors={themeColors} currentThemeName={theme.name} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ExpertisePage: React.FC = () => {
    const { theme } = useTheme();
    const [poppedItemId, setPoppedItemId] = useState<string | null>(null);

    const pageBgColor = theme.name === 'light' ? 'bg-white' : 'bg-slate-900';
    const baseCardBgLight = 'bg-slate-50';
    const baseCardBgDark = 'bg-slate-800';
    const altCardBgLight = 'bg-white';
    const altCardBgDark = 'bg-slate-700';

    const textColor = theme.name === 'light' ? 'text-slate-700' : 'text-slate-200';
    const titleColor = theme.name === 'light' ? 'text-slate-900' : 'text-slate-50';
    const descriptionColor = theme.name === 'light' ? 'text-slate-600' : 'text-slate-300';
    const accentColor = theme.name === 'light' ? 'text-indigo-500' : 'text-indigo-400';

    type ExpertiseItemType = {
        id: string;
        title: string;
        description: string;
        icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
        alignShape: 'left' | 'right';
    };

    const expertiseData: ExpertiseItemType[] = [
        {
            id: 'cloud',
            title: 'Cloud Native Proficiency.',
            description: 'Deploying scalable AWS, Azure, and GCP solutions. Specializing in event-driven, serverless infrastructure.',
            icon: ServerStackIcon,
            alignShape: 'right',
        },
        {
            id: 'serverless',
            title: 'Serverless Mastery.',
            description: 'Leveraging Lambda, API Gateway, and real-time data streaming to build sleek, automated systems.',
            icon: BoltIcon,
            alignShape: 'left',
        },
        {
            id: 'devops',
            title: 'Automation & DevOps.',
            description: 'CI/CD, Terraform, and rapid delivery pipelines for seamless development from code to cloud.',
            icon: Cog6ToothIcon,
            alignShape: 'right',
        },
    ];

    return (
        <div className={`min-h-screen ${pageBgColor} ${textColor} p-4 py-8 sm:p-8 md:p-12 lg:p-16 transition-colors duration-300`}>
            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="space-y-12 md:space-y-16 lg:space-y-20">
                    {expertiseData.map((item, index) => {
                        const currentCardBg = index % 2 === 0
                            ? (theme.name === 'light' ? baseCardBgLight : baseCardBgDark)
                            : (theme.name === 'light' ? altCardBgLight : altCardBgDark);

                        const themeColorsForBlock = {
                            cardBg: currentCardBg,
                            textColor,
                            titleColor,
                            descriptionColor,
                            accentColor
                        };

                        return (
                            <div key={item.id} className="max-w-3xl mx-auto">
                                <ExpertiseBlock
                                    title={item.title}
                                    description={item.description}
                                    icon={item.icon}
                                    alignShape={item.alignShape}
                                    themeColors={themeColorsForBlock}
                                    isPopped={item.id === poppedItemId}
                                    onSetPopped={() => setPoppedItemId(item.id)}
                                    onClearPopped={() => setPoppedItemId(null)}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ExpertisePage; 