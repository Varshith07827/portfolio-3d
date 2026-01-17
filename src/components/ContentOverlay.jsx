import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ExternalLink, Code, Layers, Smartphone, Zap, FileText, Trophy, Briefcase, PenTool, Cpu, Globe, Terminal, User } from 'lucide-react'

export const ContentOverlay = ({ isHeroMode, onLeap }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
                duration: 0.8,
                ease: [0.165, 0.84, 0.44, 1]
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 1
            }
        }
    }

    return (
        <div className="content-root">
            {/* Hero Section */}
            <div className="hero-links top-corner-links">
                <a href="mailto:alonewalker07827@gmail.com" className="icon-link"><Mail /></a>
                <a href="https://www.linkedin.com/in/venkata-sai-varshith-s-1889442a6" target="_blank" className="icon-link"><Linkedin /></a>
                <a href="https://github.com/Varshith07827" target="_blank" className="icon-link"><Github /></a>
                <a href="RESUMESNAPSHOT.pdf" target="_blank" className="icon-link"><FileText /></a>
            </div>

            <section id="hero">
                <div className="container">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.p variants={itemVariants} className="sub-heading">
                            {isHeroMode ? "Systems & OS Enthusiast" : "Software Engineer • ML/AI Developer"}
                        </motion.p>
                        <motion.h1 variants={itemVariants} className="text-gradient">
                            Venkata Sai Varshith<br />Sandaka
                        </motion.h1>
                        <motion.p variants={itemVariants} className="headline">
                            Building things that actually work. Breaking things to understand why they don’t.
                        </motion.p>



                        <motion.button
                            variants={itemVariants}
                            className="leap-button"
                            onClick={onLeap}
                        >
                            {isHeroMode ? "Return to Focus" : "Secret Life"}
                        </motion.button>
                    </motion.div>

                    {/* Trait/Stat Cards - Mapped to "Subtle metrics" from data.txt */}

                </div>
            </section>

            {/* About Section */}
            <motion.section
                id="about"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-5%", amount: 0.1 }}
                variants={containerVariants}
            >
                <div className="container">
                    <motion.div variants={itemVariants} className="glass-card about-card">
                        <h2 className="giant-heading">About Me</h2>
                        <div className="about-content">
                            <p style={{ marginBottom: '1.5rem' }}>
                                A dual-degree B.Tech + B.Sc student who started as the introverted, two-movies-a-day guy and somehow ended up organizing massive tech events, winning hackathons on streak, and building systems people actually use. I like solving problems that punch back—operating systems, AI pipelines, NFC infrastructure, system design, and hackathon chaos.
                            </p>
                            <p style={{ marginBottom: '1.5rem' }}>
                                I believe in the 1% mentality: learn faster, build faster, ship better. My work blends creativity, sarcasm, and that student-chaos energy that turns ideas into functioning prototypes at 3 AM.
                            </p>
                            <p style={{ fontWeight: 'bold', color: 'var(--accent-noir)' }}>
                                I don’t chase clout. I chase craft.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Skills Section */}
            <motion.section
                id="skills"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-5%", amount: 0.1 }}
                variants={containerVariants}
            >
                <div className="container">
                    <motion.h2 variants={itemVariants}>Technical Arsenal</motion.h2>
                    <div className="skills-grid">
                        <SkillCard icon={<Code />} title="Languages" items={["Java", "Python", "C/C++", "JavaScript", "SQL"]} />
                        <SkillCard icon={<Zap />} title="Frameworks & Libs" items={["Flask", "TensorFlow", "Pandas", "Scikit-Learn", "React"]} />
                        <SkillCard icon={<Terminal />} title="Tools & Platforms" items={["Git", "Docker", "Linux (Ubuntu)", "Razorpay API", "VS Code"]} />
                        <SkillCard icon={<Cpu />} title="Core Concepts" items={["OS Architecture", "Distributed Systems", "Graph Theory", "Automata", "ML Training"]} />
                    </div>
                </div>
            </motion.section>

            {/* Experience Section */}
            <motion.section
                id="experience"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-5%", amount: 0.1 }}
                variants={containerVariants}
            >
                <div className="container">
                    <motion.h2 variants={itemVariants}>Experience & Execution</motion.h2>
                    <div className="experience-grid">
                        <ExperienceCard
                            role="Intern (Tech & Design)"
                            company="Languify.ai"
                            year="2025"
                            desc="Improved problem-solving speed across API design, debugging, and system-level thinking. Worked on real-world tech tasks and design implementations."
                        />
                        <ExperienceCard
                            role="Event Organizer"
                            company="Campus Tech Fest"
                            year=""
                            desc="Led and executed large-scale events within one week. Managed operations, logistics, and team coordination. Brought structure into absolute chaos."
                        />
                        <ExperienceCard
                            role="Automation Developer"
                            company="US-Based Client"
                            year=""
                            desc="Built solutions using Playwright, Selenium, Python, and n8n to automate complex workflows and solve real-world efficiency problems."
                        />
                        <ExperienceCard
                            role="Leadership"
                            company="Novus Club"
                            year=""
                            desc="Empowering students to master new technologies while studying. Fostering a community of peer learning and technical growth."
                        />
                        <ExperienceCard
                            role="Campus Ambassador"
                            company="Comet by Perplexity.ai"
                            year=""
                            desc="Official Campus Ambassador driving brand awareness and product adoption. Executing marketing strategies and outreach to expand the user base."
                        />
                    </div>
                </div>
            </motion.section>

            {/* Projects Section */}
            <motion.section
                id="projects"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-5%", amount: 0.1 }}
                variants={containerVariants}
            >
                <div className="container">
                    <motion.h2 variants={itemVariants}>Featured Works (The Grind)</motion.h2>
                    <div className="projects-grid">
                        <ProjectCard
                            title="HEALIO"
                            role="Full-stack + ML"
                            desc="AI-Driven early disease detection system. Patient/Doctor portal, appointment system, and symptom-to-disease prediction using ML."
                            tech="Flask, SQLite, ML Models"
                        />
                        <ProjectCard
                            title="ByteCoins"
                            role="Backend + Architect"
                            desc="NFC-based payment ecosystem for campus. Admin-only writing, user reading, and Razorpay integration with secure token handling."
                            tech="Java, NFC, Razorpay API"
                        />
                        <ProjectCard
                            title="Graph Theory Suite"
                            role="Algorithm Dev"
                            desc="Competitive programming suite for DFS, BFS, Dijkstra, MST, etc. Converted C OS programs to Python for academic mastery."
                            tech="Python, Algorithms"
                        />
                        <ProjectCard
                            title="AI Art Generator"
                            role="ML Developer"
                            desc="Hackathon project: Built a GAN-based art generator from scratch using TensorFlow and CUDA acceleration."
                            tech="TensorFlow, GANs, CUDA"
                        />
                        <ProjectCard
                            title="Ultrasonic Detector"
                            role="Embedded Dev"
                            desc="Real-time sweep-scanning obstacle detection system using ultrasonic sensors, servo motors, and terminal visualization."
                            tech="Embedded C, Hardware"
                        />
                        <ProjectCard
                            title="HireHub"
                            role="System Architect"
                            desc="Micro-matching workforce system connecting companies with temporary manpower for short-duration tasks."
                            tech="System Design"
                        />
                    </div>
                </div>
            </motion.section>

            {/* Achievements Section */}
            <motion.section
                id="achievements"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-5%", amount: 0.1 }}
                variants={containerVariants}
            >
                <div className="container">
                    <motion.h2 variants={itemVariants} style={{ marginBottom: '3rem' }}>Wins & Milestones</motion.h2>
                    <div className="stats-grid">
                        <TraitCard title="Hackathons" value="6x Winner" sub="Streak" />
                        <TraitCard title="Events" value="Scale: Massive" sub="1 Week Prep" />
                        <TraitCard title="Learning" value="Rapid Adaptation" sub="OS, AI, Graph" />
                    </div>
                    <div className="glass-card highlight-card">
                        <h3 className="highlight-header"><Trophy size={20} style={{ marginRight: '0.5rem', color: 'var(--accent-noir)' }} /> Highlights</h3>
                        <ul className="highlight-list">
                            <li>Organized large-scale tech events in 1 week</li>
                            <li>Built multiple end-to-end systems across domains</li>
                            <li>Survived 4-hour sleep cycles & caffeine sprints</li>
                            <li>Rapid learning streak across OS, ML, FLAT, Stats</li>
                        </ul>
                    </div>
                </div>
            </motion.section>

            {/* Perspectives & Community Section */}
            <motion.section
                id="community"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-5%", amount: 0.1 }}
                variants={containerVariants}
            >
                <div className="container">
                    <motion.h2 variants={itemVariants}>Leadership & Perspectives</motion.h2>
                    <div className="perspectives-grid">
                        <div className="glass-card" style={{ padding: '2rem' }}>
                            <h3 style={{ marginBottom: '1rem' }}><PenTool size={20} /> Thought Leadership</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                Writing about the Top 1% mentality, student struggles, Hackathon chronicles, and the chaos of engineering.
                            </p>
                            <span style={{ fontSize: '0.9rem', color: 'var(--accent-noir)' }}>Direct. Witty. Unfiltered.</span>
                        </div>
                        <div className="glass-card" style={{ padding: '2rem' }}>
                            <h3 style={{ marginBottom: '1rem' }}><User size={20} /> Leadership</h3>
                            <ul className="skill-list">
                                <li>Campus Event Organizer (2 Major Events/Week)</li>
                                <li>Hackathon Team Lead</li>
                                <li>Community Mentor</li>
                            </ul>
                        </div>
                        <div className="glass-card" style={{ padding: '2rem' }}>
                            <h3 style={{ marginBottom: '1rem' }}><Globe size={20} /> Research & Open Source</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                                <strong>Research:</strong> Smart face analyzer (Computer Vision)
                            </p>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                <strong>Open Source:</strong> Algorithm Libs, OS Implementations (C to Python)
                            </p>
                        </div>
                        <div className="glass-card" style={{ padding: '2rem' }}>
                            <h3 style={{ marginBottom: '1rem' }}><FileText size={20} /> Certifications</h3>
                            <ul className="skill-list">
                                <li>NPTEL: Joy of Computing (Python)</li>
                                <li>Coursework: OS, DBMS, FLAT, ML</li>
                                <li>Probability & Stats Modules</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Interests Section */}
            <motion.section
                id="interests"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-5%", amount: 0.1 }}
                variants={containerVariants}
            >
                <div className="container">
                    <h2 className="sub-heading" style={{ marginBottom: '2rem', fontSize: '2rem', color: 'white' }}>Interests & Curiosities</h2>
                    <div className="interests-grid">
                        <div className="glass-card interest-card">
                            <h3 className="interest-header">Technical</h3>
                            <p className="interest-content">AI Systems, OS Internals, NFC Infrastructure, Graph Algos, Termux Tinkering, System Design.</p>
                        </div>
                        <div className="glass-card interest-card">
                            <h3 className="interest-header">Personal</h3>
                            <p className="interest-content">Hardcore Learning Phases, Adventure Energy, Student Chaos, Sarcasm.</p>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Footer */}
            <footer className="footer" style={{ marginTop: '4rem' }}>
                <div className="container">
                    <div className="social-links">
                        <a href="https://www.linkedin.com/in/venkata-sai-varshith-s-1889442a6" target="_blank"><Linkedin /></a>
                        <a href="https://github.com/Varshith07827" target="_blank"><Github /></a>
                        <a href="mailto:alonewalker07827@gmail.com"><Mail /></a>
                    </div>
                    <p style={{ opacity: 0.7 }}>Built with consistency, caffeine, and questionable sleep cycles.</p>
                    <p style={{ fontSize: '0.8rem', opacity: 0.5, marginTop: '1rem' }}>© 2026 Varshith.</p>
                </div>
            </footer>


        </div>
    )
}

const SkillCard = ({ icon, title, items }) => (
    <div className="glass-card">
        <div style={{ marginBottom: '1rem', color: 'var(--accent-noir)' }}>{icon}</div>
        <h3>{title}</h3>
        <ul className="skill-list">
            {items.map(item => <li key={item}>{item}</li>)}
        </ul>
    </div>
)

const ProjectCard = ({ title, role, desc, tech }) => (
    <div className="glass-card project-card">
        <div className="project-header">
            <h3>{title}</h3>
            {role && <span className="role-tag">{role}</span>}
        </div>
        <p className="project-desc">{desc}</p>
        <div className="project-tech">{tech}</div>
        <div className="project-link">
            <ExternalLink size={16} />
        </div>
    </div>
)

const TraitCard = ({ title, value, sub }) => (
    <div className="glass-card stat-card">
        <h4 className="stat-title">{title}</h4>
        <div className="stat-value">{value}</div>
        {sub && <div className="stat-sub">{sub}</div>}
    </div>
)

const ExperienceCard = ({ role, company, year, desc }) => (
    <div className="glass-card project-card">
        <div className="project-header">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h3>{role}</h3>
                    <div className="role-tag">{company}</div>
                </div>
                {year && <div className="project-tech" style={{ marginTop: 0, padding: 0, border: 'none', opacity: 0.8 }}>{year}</div>}
            </div>
        </div>
        <p className="project-desc">{desc}</p>
    </div>
)
