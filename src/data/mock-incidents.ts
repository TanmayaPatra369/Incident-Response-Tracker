
import { Incident } from "@/types/incident";

// Generate some realistic mock incidents
export const mockIncidents: Incident[] = [
  {
    id: "1",
    title: "Database Connection Failure",
    description:
      "Production database became unreachable, causing application downtime. Initial investigation shows network connectivity issues.",
    severity: "High",
    status: "Resolved",
    createdAt: "2025-05-10T14:23:00Z",
    updatedAt: "2025-05-10T16:45:00Z",
    tags: ["database", "production", "network"],
    statusUpdates: [
      {
        id: "1-3",
        status: "Resolved",
        message: "Issue resolved - Network switch reconfigured and connections restored. Added monitoring for early detection.",
        timestamp: "2025-05-10T16:45:00Z",
        user: "Jane Smith",
      },
      {
        id: "1-2",
        status: "In Progress",
        message: "Identified faulty network switch. Team working on replacing hardware.",
        timestamp: "2025-05-10T15:10:00Z",
        user: "Alex Johnson",
      },
      {
        id: "1-1",
        status: "Open",
        message: "Incident created. Database connections failing. Starting investigation.",
        timestamp: "2025-05-10T14:23:00Z",
        user: "System",
      },
    ],
  },
  {
    id: "2",
    title: "Frontend Authentication Error",
    description:
      "Users unable to log in to the application. Error occurs during OAuth token validation.",
    severity: "Medium",
    status: "In Progress",
    createdAt: "2025-05-12T09:15:00Z",
    updatedAt: "2025-05-12T10:30:00Z",
    tags: ["auth", "frontend", "oauth"],
    statusUpdates: [
      {
        id: "2-2",
        status: "In Progress",
        message: "Issue identified - OAuth configuration mismatch after recent deployment. Working on fix.",
        timestamp: "2025-05-12T10:30:00Z",
        user: "Sarah Williams",
      },
      {
        id: "2-1",
        status: "Open",
        message: "Users reporting authentication failures. Starting investigation.",
        timestamp: "2025-05-12T09:15:00Z",
        user: "System",
      },
    ],
  },
  {
    id: "3",
    title: "API Rate Limiting",
    description:
      "Third-party payment processor API enforcing unexpected rate limits, causing payment processing delays.",
    severity: "Medium",
    status: "Open",
    createdAt: "2025-05-13T08:05:00Z",
    updatedAt: "2025-05-13T08:05:00Z",
    tags: ["api", "payments", "third-party"],
    statusUpdates: [
      {
        id: "3-1",
        status: "Open",
        message: "Detected unusual rate limiting on payment API. Investigating cause.",
        timestamp: "2025-05-13T08:05:00Z",
        user: "System",
      },
    ],
  },
  {
    id: "4",
    title: "Memory Leak in Backend Service",
    description:
      "Order processing service exhibiting memory growth over time, requiring restart every 12 hours.",
    severity: "Low",
    status: "In Progress",
    createdAt: "2025-05-11T11:30:00Z",
    updatedAt: "2025-05-11T14:45:00Z",
    tags: ["backend", "memory", "performance"],
    statusUpdates: [
      {
        id: "4-2",
        status: "In Progress",
        message: "Initial analysis points to connection pool not properly releasing resources. Implementing fix.",
        timestamp: "2025-05-11T14:45:00Z",
        user: "Mike Chen",
      },
      {
        id: "4-1",
        status: "Open",
        message: "Order processing service requiring frequent restarts. Starting investigation.",
        timestamp: "2025-05-11T11:30:00Z",
        user: "System",
      },
    ],
  },
  {
    id: "5",
    title: "SSL Certificate Expiration Warning",
    description:
      "SSL certificate for api.example.com will expire in 7 days. Renewal needed.",
    severity: "Low",
    status: "Open",
    createdAt: "2025-05-13T07:00:00Z",
    updatedAt: "2025-05-13T07:00:00Z",
    tags: ["security", "ssl", "maintenance"],
    statusUpdates: [
      {
        id: "5-1",
        status: "Open",
        message: "Automated check detected upcoming SSL certificate expiration.",
        timestamp: "2025-05-13T07:00:00Z",
        user: "System",
      },
    ],
  },
];
