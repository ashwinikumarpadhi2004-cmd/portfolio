import { useEffect, useMemo, useState } from 'react'
import './App.css'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

const skillData = [
  { name: 'Flutter', level: 92, status: 'Core' },
  { name: 'Dart', level: 88, status: 'Core' },
  { name: 'Firebase', level: 76, status: 'Used in projects' },
  { name: 'REST APIs', level: 80, status: 'Practical' },
  { name: 'Git', level: 82, status: 'Professional' },
  { name: 'GitHub', level: 84, status: 'Professional' },
  { name: 'State Management', level: 78, status: 'Practical' },
  { name: 'Responsive UI', level: 90, status: 'Core' },
  { name: 'UI/UX Implementation', level: 86, status: 'Core' },
  { name: 'Python', level: 60, status: 'Currently Learning' },
  { name: 'Generative AI', level: 52, status: 'Exploring' },
  { name: 'LangChain', level: 48, status: 'Exploring' },
]

const experienceItems = [
  {
    title: 'Flutter Developer',
    duration: '9 Months Experience',
    description:
      'Focused on Flutter application development, responsive UI building, API integration, state management, debugging, and reusable component design.',
    tags: ['Flutter app development', 'Responsive UI', 'API integration', 'State management', 'Debugging', 'Git/GitHub'],
  },
]

const projectFilters = ['All', 'Flutter', 'Mobile Apps', 'UI/UX', 'AI']

const projects = [
  {
    title: 'Project One',
    category: 'Flutter',
    description: `CribCARE (Flutter - Mobile Application)
CribCare is a user-friendly app enabling facile apartment management system.
It is a cross-platform application designed for Android and iOS devices.
Utilized Provider / GetX for efficient state management and reactive UI updates.
Designed responsive UI with Material Design components for both Android and iOS.`,
    tags: ['Flutter', 'Dart', 'Firebase'],
    accent: 'cyan',
    status: 'Completed',
  },
  {
    title: 'Project Two',
    category: 'Mobile Apps',
    description: `Task Management App(Flutter - Mobile Application)
Developed a cross-platform mobile application that helps users create, manage, and track 
daily tasks efficiently. The application supports task creation, status tracking, reminders, 
and real-time updates, improving productivity and task organization. 
Implemented task CRUD operations. Optimized app performance and handled API 
errors. 
Implemented state management using Provider. Integrated REST APIs and Firebase 
services. 
Designed responsive UI with Material Design components for both Android and iOS. `,
    tags: ['Flutter', 'REST API', 'UI/UX'],
    accent: 'purple',
    status: 'Completed',
  },
  {
    title: 'Project Three',
    category: 'Mobile App',
    description: `SUSTAJN (Flutter - Mobile Application) 
SUSTAJN is a user-friendly application designed for container tracking. 
It is a cross-platform application designed for both Android and iOS devices. 
It designed with clean and responsive UI with Material Design components for Android & iOS. `,
    tags: ['Flutter','Firebase', 'UI/UX'],
    accent: 'blue',
    status: 'In Progress',
  },
  // {
  //   title: 'Mobile Design System',
  //   category: 'UI/UX',
  //   description: 'Placeholder design system project focused on reusable component patterns and polished interface consistency.',
  //   tags: ['Flutter', 'Design system', 'Responsive'],
  //   accent: 'orange',
  //   status: 'Placeholder',
  // },
]

const serviceData = [
  {
    title: 'Flutter App Development',
    description: 'Build modern cross-platform mobile applications using Flutter.',
    icon: 'F',
  },
  {
    title: 'UI Development',
    description: 'Convert designs into responsive and beautiful Flutter interfaces.',
    icon: 'UI',
  },
  {
    title: 'API Integration',
    description: 'Integrate REST APIs and backend services into mobile applications.',
    icon: 'API',
  },
  {
    title: 'Firebase Integration',
    description: 'Authentication, database and other Firebase-powered features.',
    icon: 'FB',
  },
  {
    title: 'App Optimization',
    description: 'Improve application performance, responsiveness and user experience.',
    icon: '⚡',
  },
]

const reasons = [
  {
    title: 'Clean & Maintainable Code',
    description: 'Focus on readable and reusable code.',
  },
  {
    title: 'Modern UI',
    description: 'Build visually appealing and responsive interfaces.',
  },
  {
    title: 'Problem Solving',
    description: 'Approach development challenges logically and creatively.',
  },
  {
    title: 'Continuous Learning',
    description: 'Constantly learning new technologies and development practices.',
  },
  {
    title: 'User Focused',
    description: 'Focus on creating simple and enjoyable user experiences.',
  },
]

const techStack = ['Flutter', 'Dart', 'Firebase', 'Git', 'GitHub', 'REST API', 'Python', 'LangChain', 'Generative AI']

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/ashwinikumarpadhi2004-cmd ', aria: 'GitHub profile' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ashwinikumar-padhi-b8474631b ', aria: 'LinkedIn profile' },
  { label: 'Email', href: 'https://github.com/ashwinikumarpadhi2004-cmd', aria: 'Email address' },
]

const stats = [
  { value: '9+', label: 'Months Experience' },
  { value: '2+', label: 'Projects' },
  { value: 'Flutter', label: 'Primary Technology' },
  { value: 'Continuous', label: 'Learning' },
]

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading reveal">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  )
}

function Button({ variant = 'primary', href = '#', children, className = '', download = false }) {
  const classes = `button ${variant} ${className}`.trim()

  return (
    <a className={classes} href={href} download={download ? '' : undefined}>
      {children}
    </a>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('home')
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitState, setSubmitState] = useState('idle')

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const value = total > 0 ? (window.scrollY / total) * 100 : 0
      setScrollProgress(value)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      },
      { threshold: 0.12 },
    )

    revealItems.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.slice(1))
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) {
          setActiveSection(visible.target.id)
        }
      },
      { threshold: [0.25, 0.5, 0.75] },
    )

    sectionIds.forEach((id) => {
      const section = document.getElementById(id)
      if (section) sectionObserver.observe(section)
    })

    return () => sectionObserver.disconnect()
  }, [])

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projects
    }

    return projects.filter((project) => project.category === activeFilter)
  }, [activeFilter])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  const validate = () => {
    const nextErrors = {}

    if (!formData.name.trim()) nextErrors.name = 'Please enter your name.'
    if (!formData.email.trim()) {
      nextErrors.email = 'Please enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }
    if (!formData.subject.trim()) nextErrors.subject = 'Please add a subject.'
    if (!formData.message.trim()) nextErrors.message = 'Please write a short message.'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validate()) {
      setSubmitState('error')
      return
    }

    setIsSubmitting(true)
    setSubmitState('idle')

    window.setTimeout(() => {
      setIsSubmitting(false)
      setSubmitState('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 1200)
  }

  const handleNavClick = () => {
    setMenuOpen(false)
  }

  return (
    <div className="page-shell">
      <div className="scroll-progress" aria-hidden="true">
        <span style={{ width: `${scrollProgress}%` }} />
      </div>

      <header className="site-header">
        <nav className={`navbar ${scrollProgress > 12 ? 'scrolled' : ''}`}>
          <a href="#home" className="brand" aria-label="Ashwini Kumar Padhi home">
            Ashwini Kumar Padhi
          </a>

          <button
            type="button"
            className={`mobile-toggle ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`nav-panel ${menuOpen ? 'open' : ''}`}>
            <ul className="nav-list">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={activeSection === item.href.slice(1) ? 'active' : ''}
                    onClick={handleNavClick}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button href="D:\portfolio\public\Ashwini Kumar Padhi.pdf" className="nav-cta" download>
              Download Resume
            </Button>
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="section hero-section">
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <span className="eyebrow">Flutter Developer • Mobile Experiences</span>
              <h1>
                Hi, I&apos;m Ashwini Kumar Padhi
                <span className="gradient-text">Flutter Developer</span>
              </h1>
              <p className="hero-subtitle">
                Building beautiful, scalable and user-friendly mobile experiences with Flutter.
              </p>
              <div className="experience-badge">9 Months of Professional Experience</div>

              <div className="cta-row">
                <Button href="#projects">View My Work</Button>
                <Button href="D:\portfolio\public\Ashwini Kumar Padhi.pdf" variant="secondary" download>
                  Download Resume
                </Button>
                <Button href="#contact" variant="ghost">Let&apos;s Connect</Button>
              </div>

              <div className="mini-stats">
                <div>
                  <strong>9+</strong>
                  <span>Months</span>
                </div>
                <div>
                  <strong>2+</strong>
                  <span>Projects</span>
                </div>
                <div>
                  <strong>Flutter</strong>
                  <span>Core</span>
                </div>
              </div>
            </div>

            <div className="hero-visual reveal">
              <div className="visual-glow"></div>
              <div className="floating-card code-card">
                <div className="code-header">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <pre>
{`class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: HomeScreen(),
    );
  }
}`}
                </pre>
              </div>

              <div className="floating-card phone-card">
                <div className="phone-screen">
                  <div className="screen-top"></div>
                  <div className="screen-chart"></div>
                  <div className="screen-bars">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>

              <div className="floating-chip chip-one">Flutter</div>
              <div className="floating-chip chip-two">Dart</div>
              <div className="floating-chip chip-three">Firebase</div>
              <div className="orb orb-one"></div>
              <div className="orb orb-two"></div>
              <div className="orb orb-three"></div>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container">
            <SectionHeading
              eyebrow="About Me"
              title="About Me"
              description="I create modern, responsive and user-friendly mobile applications with a focus on clean design and maintainable code."
            />

            <div className="about-grid">
              <div className="about-copy reveal">
                <p>
                  I&apos;m Ashwini Kumar Padhi, a Flutter Developer with 9 months of experience focused on building modern,
                  responsive and user-friendly mobile applications.
                </p>
                <p>
                  I am passionate about mobile app development, clean UI, good UX, writing maintainable code, learning new
                  technologies, and building real-world applications that make a difference.
                </p>
              </div>

              <div className="about-visual reveal">
                <div className="about-panel">
                  <div className="about-badge">Flutter Developer</div>
                  <div className="about-stack">
                    <span>Flutter</span>
                    <span>UI/UX</span>
                    <span>Clean Code</span>
                  </div>
                </div>

                <div className="stats-grid">
                  {stats.map((stat) => (
                    <div key={stat.label} className="stat-item">
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="container">
            <SectionHeading eyebrow="Technical Skills" title="Technical Skills" />

            <div className="skills-grid">
              {skillData.map((skill) => (
                <div key={skill.name} className="skill-card reveal">
                  <div className="skill-header">
                    <span>{skill.name}</span>
                    <small>{skill.status}</small>
                  </div>
                  <div className="progress-bar" aria-label={`${skill.name} skill level`}>
                    <span style={{ width: `${skill.level}%` }}></span>
                  </div>
                  <div className="skill-metrics">
                    <strong>{skill.level}%</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section">
          <div className="container">
            <SectionHeading eyebrow="Experience" title="Experience" />

            <div className="timeline reveal">
              {experienceItems.map((item) => (
                <article key={item.title} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-card">
                    <div className="timeline-header">
                      <h3>{item.title}</h3>
                      <span>{item.duration}</span>
                    </div>
                    <p>{item.description}</p>
                    <div className="tag-list">
                      {item.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="container">
            <SectionHeading eyebrow="Featured Projects" title="Featured Projects" />

            <div className="filter-row reveal">
              {projectFilters.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={item === activeFilter ? 'filter-btn active' : 'filter-btn'}
                  onClick={() => setActiveFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <article key={project.title} className={`project-card reveal ${project.accent}`}>
                  <div className="project-media">
                    <div className="project-badge">{project.status}</div>
                  </div>
                  <div className="project-body">
                    <div className="project-head">
                      <h3>{project.title}</h3>
                    </div>
                    <p>{project.description}</p>
                    <div className="tag-list">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="project-actions">
                      <a href="#" className="button secondary">GitHub</a>
                      <a href="#" className="button ghost">Live Demo</a>
                      <a href="#" className="button tertiary">View Details</a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <div className="container">
            <SectionHeading eyebrow="Services" title="What I Can Do" />

            <div className="services-grid">
              {serviceData.map((service) => (
                <article key={service.title} className="service-card reveal">
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section why-section">
          <div className="container">
            <SectionHeading eyebrow="Why Work With Me?" title="Why Work With Me?" />

            <div className="reasons-grid">
              {reasons.map((reason) => (
                <div key={reason.title} className="reason-card reveal">
                  <h3>{reason.title}</h3>
                  <p>{reason.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section tech-showcase">
          <div className="container marquee-wrap reveal">
            <div className="marquee-track">
              {[...techStack, ...techStack].map((item, index) => (
                <div key={`${item}-${index}`} className="marquee-item">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="resume" className="section">
          <div className="container">
            <div className="resume-card reveal">
              <div className="resume-copy">
                <span className="eyebrow">Profile</span>
                <h2>Let&apos;s Build Something Great</h2>
                <p>Interested in working together or discussing a project?</p>

                <div className="cta-row">
                  <Button href="D:\portfolio\public\Ashwini Kumar Padhi.pdf" variant="primary" download>
                    Download Resume
                  </Button>
                  <Button href="D:\portfolio\public\Ashwini Kumar Padhi.pdf" variant="secondary" download>
                    View Resume
                  </Button>
                </div>
              </div>

              <div className="resume-preview">
                <div className="preview-window">
                  <div className="preview-top">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="preview-body">
                    <div className="preview-header">
                      <strong>Ashwini Kumar Padhi</strong>
                      <small>Flutter Developer</small>
                    </div>
                    <div className="preview-lines">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div className="preview-box"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container contact-grid">
            <div className="contact-copy reveal">
              <SectionHeading eyebrow="Contact" title="Let&apos;s Connect" />
              <div className="contact-links">
                <a href="mailto:padhiashwini143@gmail.com">Email - padhiashwini143@gmail.com</a>
                <a href="https://www.linkedin.com/in/ashwini-kumar-padhi-b8474631b " target="_blank" rel="noreferrer">LinkedIn - Ashwini Kumar Padhi</a>
                <a href="https://github.com/ashwinikumarpadhi2004-cmd" target="_blank" rel="noreferrer">GitHub - https://github.com/ashwinikumarpadhi2004-cmd</a>
                <a href="tel:+91 9692245973">Phone - +91 9692245973</a>
              </div>
            </div>

            <form className="contact-form reveal" noValidate onSubmit={handleSubmit}>
              <div className="field-row two-up">
                <div className="field-group">
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} />
                  {errors.name ? <small>{errors.name}</small> : null}
                </div>
                <div className="field-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                  {errors.email ? <small>{errors.email}</small> : null}
                </div>
              </div>

              <div className="field-group">
                <label htmlFor="subject">Subject</label>
                <input id="subject" name="subject" type="text" value={formData.subject} onChange={handleChange} />
                {errors.subject ? <small>{errors.subject}</small> : null}
              </div>

              <div className="field-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="5" />
                {errors.message ? <small>{errors.message}</small> : null}
              </div>

              <button type="submit" className="button primary submit-button" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitState === 'success' ? <p className="form-status success">Message sent successfully.</p> : null}
              {submitState === 'error' ? <p className="form-status error">Please fix the highlighted fields.</p> : null}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <h3>Ashwini Kumar Padhi</h3>
            <p>Flutter Developer</p>
          </div>

          <div className="footer-links">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} target={social.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div className="container footer-bottom">
          <p>© 2026 Ashwini Kumar Padhi. All rights reserved.</p>
        </div>
      </footer>

      <button
        type="button"
        className="back-to-top"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </button>
    </div>
  )
}

export default App
