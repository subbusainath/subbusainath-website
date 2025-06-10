import React, { useState, useEffect } from 'react';
import { useTheme } from '@/components/Hooks/themeHook';
import { 
  Calendar, 
  MapPin,  
  Users, 
  Code2, 
  Presentation,
  Filter,
  Star
} from 'lucide-react';

// Interface for timeline events
interface TimelineEvent {
  id: number;
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  category: 'education' | 'work' | 'achievement' | 'project';
  color: string;
  featured?: boolean;
  icon: React.ReactNode;
}

// Sample timeline data with rich details
const timelineData: TimelineEvent[] = [
  {
    id: 1,
    title: "Computer Science and Engineering Degree",
    company: "Anna University",
    period: "2014 - 2018",
    location: "Chennai, TN",
    description: "Graduated with honors. Specialized in Computer Science and Engineering. Led engineering team of 4 and built an app-lock mechanism using rubic algorithm.",
    category: "education",
    color: "from-blue-500 to-indigo-600",
    icon: <Calendar className="w-6 h-6" />,
  },
  {
    id: 2,
    title: "Software Engineering Intern - Android ",
    company: "Surya Informatics and Solutions.",
    period: "Summer 2017-2018",
    location: "Chennai, TN",
    description: "Developed mobile banking application using Java 8 and android. Implemented CI/CD pipelines that reduced deployment time by 40%.",
    category: "work",
    color: "from-green-500 to-emerald-600",
    icon: <Code2 className="w-6 h-6" />,
  },
  {
    id: 3,
    title: "Assosiate Consultant - 2",
    company: "Atos-Syntel Private Limited",
    period: "Nov 2018 - Nov 2020",
    location: "Chennai, TN",
    description: "Build and Managed Customer Maintenance System. Built the application using React JS and Nodejs which handles 25000+ customers information. Implemented the backend service with help of AWS EC2 and AWS S3 Bucket.",
    category: "work",
    color: "from-red-500 to-pink-600",
    icon: <Users className="w-6 h-6" />,
  },
  {
    id: 4,
    title: "Member of Technical Staff - 2",
    company: "Anstack Technologies Private Limited",
    period: "Dec 2020 - Jan 2023",
    location: "Remote - Bengaluru, KR",
    description: "Developed Digital Media Supplychain, Social Network and Data Engineering pipeline using Serverless Architecture with the help of ReactJS, AWS, NodeJS and Python.",
    category: "work",
    color: "from-red-500 to-pink-600",
    icon: <Users className="w-6 h-6" />,
  },
  {
    id: 5,
    title: "Senior Engineer",
    company: "Redgrapes Business Services Private Limited",
    period: "Jan 2023 - Jan 2024",
    location: "Remote - Chennai, TN",
    description: "Developed E-Commerce Application using Serverless Architecture with the help of ReactJS, AWS, NodeJS, Commercetools and Python.",
    category: "work",
    color: "from-red-500 to-pink-600",
    icon: <Users className="w-6 h-6" />,
  },
  {
    id: 6,
    title: "Senior Software Engineer",
    company: "Commentsold Private Limited",
    period: "Feb 2024 - Oct 2024",
    location: "Remote - US",
    description: "Developed Live Selling Application using Serverless Architecture with the help of ReactJS, AWS, NodeJS, Python.",
    category: "work",
    color: "from-red-500 to-pink-600",
    icon: <Users className="w-6 h-6" />,
  },
  {
    id: 7,
    title: "Senior Software Engineer",
    company: "Berribot India Private Limited",
    period: "Mar 2025 - Present",
    location: "Remote - IN",
    description: "Currently developing AI Based HR Suite with help of LangChain, GCP, Python, Angular and ReactJS",
    category: "work",
    color: "from-red-500 to-pink-600",
    icon: <Users className="w-6 h-6" />,
  },
  {
    id: 8,
    title: "AWS Community Builder - 3rd (Devtools)",
    company: "AWS",
    period: "Aug 2023 - Present",
    location: "Remote",
    description: "Helping Community by sharing knowledge and got acknowledged by AWS Community Program",
    category: "achievement",
    color: "from-cyan-500 to-blue-600",
    icon: <Presentation className="w-6 h-6" />,
    featured: true,
  },
];

const VerticalTimeline: React.FC = () => {
  const { theme } = useTheme();
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'education' | 'work' | 'achievement' | 'project'>('all');
  const [visibleEvents, setVisibleEvents] = useState<number[]>([]);

  // Filter events based on active filter
  const filteredEvents = timelineData.filter(event => 
    activeFilter === 'all' || event.category === activeFilter
  );

  // Animate events on scroll/mount
  useEffect(() => {
    const timer = setTimeout(() => {
      filteredEvents.forEach((_, index) => {
        setTimeout(() => {
          setVisibleEvents(prev => [...prev, index]);
        }, index * 150);
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [activeFilter, filteredEvents]);

  // Reset visible events when filter changes
  useEffect(() => {
    setVisibleEvents([]);
  }, [activeFilter]);

  const categoryConfig = {
    education: { color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300', label: 'Education' },
    work: { color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300', label: 'Work' },
    achievement: { color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300', label: 'Achievement' },
    project: { color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300', label: 'Project' }
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => setActiveFilter('all')}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
            ${activeFilter === 'all'
              ? 'bg-purple-600 text-white shadow-lg scale-105'
              : theme.name === 'dark'
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          <Filter className="w-4 h-4" />
          All Events
        </button>
        
        {Object.entries(categoryConfig).map(([category, config]) => (
        <button
            key={category}
            onClick={() => setActiveFilter(category as 'education' | 'work' | 'achievement' | 'project')}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${activeFilter === category
                ? 'bg-purple-600 text-white shadow-lg scale-105'
                : `${config.color} hover:scale-105`
              }
            `}
          >
            {config.label}
          </button>
        ))}
      </div>

      {/* Vertical Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div 
          className={`
            absolute left-8 top-0 w-0.5 h-full
            ${theme.name === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}
          `}
        />

        {/* Timeline Events */}
        <div className="space-y-12">
          {filteredEvents.map((event, index) => (
            <div
              key={event.id}
              className={`
                relative flex items-start gap-8 transition-all duration-700 transform
                ${visibleEvents.includes(index) 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
                }
              `}
              style={{
                transitionDelay: `${index * 150}ms`
              }}
            >
              {/* Timeline marker */}
              <div className="relative flex-shrink-0">
                <div 
                  className={`
                    w-16 h-16 rounded-full flex items-center justify-center
                    bg-gradient-to-r ${event.color} text-white shadow-lg
                    transform transition-all duration-300 hover:scale-110
                    relative z-10
                  `}
                >
                  {event.icon}
                </div>
                
                {/* Featured star badge */}
                {event.featured && (
                  <div className="absolute -top-1 -right-1 z-20">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1.5 shadow-lg">
                      <Star className="w-3 h-3 text-white fill-current" />
                    </div>
                  </div>
                )}
              </div>

              {/* Event card */}
              <div 
                className={`
                  flex-1 cursor-pointer group transition-all duration-300
                  hover:scale-[1.02] hover:shadow-xl
                `}
                onClick={() => setSelectedEvent(event)}
              >
                <div 
                  className={`
                    relative backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg
                    ${theme.name === 'dark'
                      ? 'bg-gray-800/60 text-white'
                      : 'bg-white/80 text-gray-900'
                    }
                    group-hover:backdrop-blur-xl group-hover:border-white/30
                    transition-all duration-300
                  `}
                  style={{
                    background: `linear-gradient(135deg, 
                      ${theme.name === 'dark' 
                        ? 'rgba(15, 23, 42, 0.6)' 
                        : 'rgba(255, 255, 255, 0.8)'
                      } 0%, 
                      ${theme.name === 'dark' 
                        ? 'rgba(30, 41, 59, 0.4)' 
                        : 'rgba(248, 250, 252, 0.4)'
                      } 100%)`
                  }}
                >
                  {/* Gradient border effect on hover */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${event.color.replace('from-', '').replace('to-', ', ')})`,
                      padding: '2px',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                    }}
                  />

                  <div className="relative space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm opacity-75 mb-2">
                          <Calendar className="w-4 h-4" />
                          <span>{event.period}</span>
                        </div>
                        
                        <h3 className="text-xl font-bold leading-tight mb-2">
                          {event.title}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-sm font-medium opacity-90">
                          <span className="text-purple-600 dark:text-purple-400">
                            {event.company}
                          </span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Category badge */}
                      <span 
                        className={`
                          flex-shrink-0 inline-flex px-3 py-1 rounded-full text-xs font-medium
                          ${categoryConfig[event.category].color}
                        `}
                      >
                        {categoryConfig[event.category].label}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm leading-relaxed opacity-80">
                      {event.description}
                    </p>

                    {/* Footer */}
                    <div className="flex justify-between items-center pt-2">
                      <div className="flex items-center gap-4">
                        {event.featured && (
                          <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="text-xs font-medium">Featured</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-xs opacity-50 group-hover:opacity-100 transition-opacity">
                        Click to expand
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedEvent(null)}
        >
          <div 
            className={`
              relative max-w-2xl w-full max-h-[80vh] overflow-y-auto
              backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl
              ${theme.name === 'dark'
                ? 'bg-gray-900/90 text-white'
                : 'bg-white/90 text-gray-900'
              }
              transform transition-all duration-500 scale-100
            `}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <div className="w-6 h-6 flex items-center justify-center text-xl">×</div>
            </button>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div 
                  className={`
                    flex items-center justify-center w-16 h-16 rounded-2xl
                    bg-gradient-to-r ${selectedEvent.color} text-white shadow-lg
                  `}
                >
                  {selectedEvent.icon}
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold">{selectedEvent.title}</h2>
                  <p className="text-purple-600 dark:text-purple-400 font-medium">
                    {selectedEvent.company}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 opacity-60" />
                  <span>{selectedEvent.period}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 opacity-60" />
                  <span>{selectedEvent.location}</span>
                </div>
              </div>

              <p className="text-base leading-relaxed">
                {selectedEvent.description}
              </p>

              <div className="flex justify-between items-center">
                <span 
                  className={`
                    inline-flex px-4 py-2 rounded-full text-sm font-medium
                    ${categoryConfig[selectedEvent.category].color}
                  `}
                >
                  {categoryConfig[selectedEvent.category].label}
                </span>
                
                {selectedEvent.featured && (
                  <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">Featured</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerticalTimeline; 