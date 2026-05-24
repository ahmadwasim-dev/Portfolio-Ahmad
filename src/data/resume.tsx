import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Ahmad",
  initials: "A",
  location: "Lahore, Pakistan",
  locationLink: "https://www.google.com/maps/place/Lahore,+Punjab,+Pakistan/",
  description:
    "Full-Stack Software Engineer specializing in Flutter Mobile App Development & MERN Stack Web Applications. Dedicated to building scalable, high-performance, and user-centric digital products.",
  summary:
    "I am a BS IT student at the University of Education Lahore with over 2 years of experience in software development. I specialize in Flutter app development and also have hands-on experience in full-stack development using the MERN stack (MongoDB, Express.js, React, Node.js). In addition, I have completed Python-based development work and have strong problem-solving skills across multiple technologies. I have built real-world projects including mobile applications, IoT systems, and service-based platforms. My focus is on developing scalable, efficient, and user-friendly applications while continuously improving my technical expertise.",
  avatarUrl: "/ahmad.jpg",
  resumeUrl: "/Ahmad.pdf",

  skills: [
    "Flutter",
    "Dart",
    "MongoDB",
    "Express.js",
    "React",
    "Node.js",
    "Python",
    "REST APIs",
    "Firebase",
    "C",
    "C++",
    "Problem Solving",
    "Web Development",
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "Git",
    "GitHub"
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "ahmadwasimpk@gmail.com",
    tel: "",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/ahmadwasim-dev",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/ahmadwasim-dev/",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/ahmadwasim-dev",
        icon: Icons.x,
        navbar: true,
      },
      Leetcode: {
        name: "Leetcode",
        url: "https://leetcode.com/u/ahmadwasim-dev",
        icon: Icons.Leetcode,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:ahmadwasimpk@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Freelance",
      href: "#",
      location: "Remote",
      title: "Freelance Developer",
      logoUrl: "/freelance.png",
      start: "2024",
      end: "Present",
      description: [
        "Worked as a freelance developer on various client projects, successfully delivering responsive mobile and web applications.",
        "Gained hands-on experience in project requirement gathering, design, end-to-end development, testing, and debugging.",
        "Strengthened developer skills in Flutter, MERN stack, Python scripting, and REST API/Firebase integration through real-world applications.",
        "Maintained client relations and communicated technical requirements and milestones clearly and effectively."
      ]
    },
    {
      company: "Upwork",
      href: "https://www.upwork.com/",
      location: "Remote",
      title: "Top Rated Freelancer",
      logoUrl: "/upwork-icon.svg",
      start: "2025",
      end: "Present",
      description: [
        "Delivered high-quality full-stack web and mobile applications for global clients.",
        "Maintained Top Rated status by consistently receiving 5-star reviews and meeting strict project deadlines.",
        "Specialized in React, Next.js, Node.js, and Flutter development, creating scalable solutions for startups and established businesses."
      ]
    },
    {
      company: "Fiverr",
      href: "https://www.fiverr.com/",
      location: "Remote",
      title: "Level 2 Seller",
      logoUrl: "https://cdn.worldvectorlogo.com/logos/fiverr-1.svg",
      start: "2025",
      end: "Present",
      description: [
        "Provided expert web and mobile application development services to a diverse client base.",
        "Successfully completed numerous projects focusing on responsive UI design, API integration, and database management.",
        "Collaborated closely with clients to transform their ideas into functional, visually appealing digital products."
      ]
    },
    {
      company: "Turing",
      href: "https://www.turing.com/",
      location: "Remote ",
      title: "AI Engineer (Part-time / Trainee)",
      logoUrl: "/turing.png",
      start: "2025",
      end: "2026",
      description: [
        "Worked as an AI Engineer, gaining hands-on experience in artificial intelligence concepts, model understanding, and architecture.",
        "Implemented practical AI-based solutions and integrations for complex client-facing applications.",
        "Collaborated with cross-functional teams to debug, refine, and improve AI model outputs and performance."
      ]
    }
  ],
  education: [
    {
      school: "University Of Education, Lahore",
      href: "https://ue.edu.pk/",
      degree: "Bachelor of Science in Information Technology (BS IT)",
      logoUrl: "/buildspace.jpeg",
      start: "2023",
      end: "2027",
    }
  ],
  projects: [
    {
      title: "AquaSense - Smart IoT Water Management Dashboard",
      href: "#",
      dates: "December 2024",
      active: true,
      description:
        "An end-to-end IoT monitoring system designed to track water quality and usage in real-time. Power consumption and sensor data are collected via ESP32 using Python and transmitted over MQTT. Built a dynamic MERN stack dashboard for data visualization, predictive usage analytics, and automated alerts for leak detection. Integrated MongoDB for historical logging.",
      technologies: [
        "Python",
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "MQTT",
        "IoT Sensors",
        "Tailwind CSS"
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/ahmadwasimpk/aquasense-iot",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "/3.mp4",
    },
    {
      title: "ShopSphere - Multi-Vendor E-Commerce Platform",
      href: "#",
      dates: "October 2024",
      active: true,
      description:
        "A multi-vendor e-commerce platform that enables multiple merchants to register, list items, and manage orders. Built with React and Redux Toolkit for the frontend, and Node.js with MongoDB for the backend. Developed secure JWT authentication, a responsive administration panel for vendors, dynamic search filtering, and credit card processing with Stripe.",
      technologies: [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Redux Toolkit",
        "Stripe",
        "Tailwind CSS",
        "JWT"
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/ahmadwasim-dev/Multi-Vendor_Ecommerce",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "/4.mp4.webm",
    },
  ],
  hackathons: [
    {
      title: "Ue Code Quest",
      dates: "April 18, 2024",
      location: "University of Education, Lahore",
      description:
        "Placed as 2nd Runner-UP in the annual coding competition, representing our department in team programming challenges.",
      image:
        "/codequest.png",
      links: [],
    },
  ],
} as const;
