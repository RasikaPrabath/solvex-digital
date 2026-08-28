import { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    slug: "staysphere",
    title: "StaySphere",
    tier: "concept",
    tagline: "A modern hotel booking and inventory operations platform for boutique hotels.",
    challenge:
      "Independent hotels rely on expensive third-party booking platforms that take large commissions and offer little customization. They need a direct booking system that they own, one that handles real-time availability, secure payments, and guest communication — without the overhead of legacy enterprise hotel software.",
    approach:
      "We designed StaySphere as a full-stack booking platform with a clean guest-facing interface and a powerful admin dashboard. The system handles room inventory, dynamic pricing, reservation management, and automated guest emails. We used Redis for real-time availability caching and built a responsive UI that works seamlessly on mobile for last-minute bookings.",
    result:
      "A production-ready booking platform that demonstrates our ability to build complex, multi-user systems with real-time data requirements. The admin dashboard provides hotel operators with complete control over their inventory, pricing rules, and guest communications — all in one place.",
    stack: ["Next.js", "ASP.NET Core", "PostgreSQL", "Redis"],
    image: "/images/project-staysphere.jpg",
    githubUrl: "#",
  },
  {
    slug: "classtrack",
    title: "ClassTrack",
    tier: "concept",
    tagline: "Attendance, student tracking, and automated revenue management for educational institutes.",
    challenge:
      "Small tuition centers and coaching institutes track student attendance on paper registers and manage fee collection through spreadsheets or WhatsApp messages. This leads to lost records, awkward payment follow-ups, and zero visibility into business performance. They need a simple, affordable system — not an over-engineered school ERP.",
    approach:
      "We built ClassTrack as a lightweight management tool focused on the two things that matter most to small education businesses: knowing who showed up and knowing who has paid. The interface is intentionally minimal — teachers mark attendance in two taps, and the system automatically tracks fee dues and sends payment reminders. We designed the data model to handle multiple classes, subjects, and fee structures without overwhelming the user.",
    result:
      "A focused product that replaces the messy combination of paper registers, Excel sheets, and WhatsApp groups. The dashboard gives center owners instant visibility into attendance trends and outstanding payments, while teachers get a friction-free daily workflow.",
    stack: ["Next.js", "Node.js", "PostgreSQL"],
    image: "/images/project-classtrack.jpg",
    githubUrl: "#",
  },
];
