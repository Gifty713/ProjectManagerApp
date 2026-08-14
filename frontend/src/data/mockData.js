// Realistic mock data for the project management UI.

export const currentUser = {
  name: "Amelia Rhodes",
  role: "Product Lead",
  email: "amelia@nexus.io",
  avatarColor: "#38023B",
}

export const stats = [
  { id: "ws", label: "My Workspaces", value: 8, accent: "#38023B", hint: "2 shared with you" },
  { id: "pr", label: "My Projects", value: 12, accent: "#55917F", hint: "4 active this week" },
  { id: "at", label: "Assigned Tasks", value: 24, accent: "#6BAB90", hint: "6 due soon" },
  { id: "ct", label: "Completed Tasks", value: 16, accent: "#2E382E", hint: "+3 since Monday" },
]

// Avatar helper colors keyed by member name
const memberColors = {
  John: "#38023B",
  Sarah: "#55917F",
  Marcus: "#6BAB90",
  Priya: "#2E382E",
  Elena: "#4a1a4d",
  Tom: "#55917F",
  Amelia: "#38023B",
  Noah: "#6BAB90",
}

export function colorFor(name) {
  return memberColors[name?.split(" ")[0]] || "#55917F"
}

export function initials(name) {
  if (!name) return "?"
  const parts = name.trim().split(" ")
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase()
}

export const kanban = {
  todo: [
    {
      id: "t1",
      title: "Design authentication page",
      description: "Create the new login and registration interface with the refreshed brand system.",
      assignee: "John",
      priority: "high",
      deadline: "Aug 18",
    },
    {
      id: "t2",
      title: "Audit onboarding funnel",
      description: "Map drop-off points across the current signup flow and note friction.",
      assignee: "Priya",
      priority: "medium",
      deadline: "Aug 21",
    },
    {
      id: "t3",
      title: "Write API documentation",
      description: "Document the v2 endpoints for the partner integrations team.",
      assignee: "Tom",
      priority: "low",
      deadline: "Aug 25",
    },
  ],
  progress: [
    {
      id: "t4",
      title: "Build dashboard analytics",
      description: "Implement the statistics cards and weekly activity summary widgets.",
      assignee: "Sarah",
      priority: "high",
      deadline: "Aug 17",
    },
    {
      id: "t5",
      title: "Refactor notification service",
      description: "Split the monolithic notifier into channel-specific handlers.",
      assignee: "Marcus",
      priority: "medium",
      deadline: "Aug 19",
    },
  ],
  done: [
    {
      id: "t6",
      title: "Set up design tokens",
      description: "Establish the shared color, spacing and typography scales.",
      assignee: "Elena",
      priority: "medium",
      deadline: "Aug 12",
    },
    {
      id: "t7",
      title: "Migrate to new CI pipeline",
      description: "Move the build and test stages onto the faster runners.",
      assignee: "Noah",
      priority: "low",
      deadline: "Aug 10",
    },
  ],
  approved: [
    {
      id: "t8",
      title: "Finalize brand palette",
      description: "Locked the plum and sage palette with the design council.",
      assignee: "Amelia",
      priority: "low",
      deadline: "Aug 08",
    },
  ],
}

export const columns = [
  { key: "todo", label: "To Do", accent: "#9a99a8" },
  { key: "progress", label: "In Progress", accent: "#38023B" },
  { key: "done", label: "Done", accent: "#6BAB90" },
  { key: "approved", label: "Approved", accent: "#55917F" },
]

export const projects = [
  {
    id: "website-redesign",
    name: "Website Redesign",
    description: "Redesign the company marketing website with the new brand identity and CMS.",
    progress: 72,
    daysRemaining: 18,
    tasks: 12,
    members: ["Amelia", "John", "Sarah", "Marcus", "Priya"],
    status: "Active",
    hasNotification: true,
    counts: { todo: 3, progress: 2, done: 4, approved: 3, total: 12 },
  },
  {
    id: "auth-system",
    name: "Authentication System",
    description: "Rebuild auth with SSO, MFA and a shared session service across products.",
    progress: 45,
    daysRemaining: 26,
    tasks: 18,
    members: ["Marcus", "Tom", "Noah"],
    status: "Active",
    hasNotification: false,
    counts: { todo: 6, progress: 5, done: 4, approved: 3, total: 18 },
  },
  {
    id: "ecommerce-platform",
    name: "E-commerce Platform",
    description: "Launch the storefront, cart and checkout with multi-currency support.",
    progress: 30,
    daysRemaining: 41,
    tasks: 27,
    members: ["Sarah", "Priya", "Elena", "John"],
    status: "Planning",
    hasNotification: true,
    counts: { todo: 12, progress: 6, done: 5, approved: 4, total: 27 },
  },
  {
    id: "mobile-app",
    name: "Mobile App v2",
    description: "Ship the redesigned iOS and Android apps with offline sync.",
    progress: 88,
    daysRemaining: 6,
    tasks: 15,
    members: ["Noah", "Elena", "Amelia"],
    status: "Active",
    hasNotification: false,
    counts: { todo: 1, progress: 2, done: 7, approved: 5, total: 15 },
  },
  {
    id: "data-warehouse",
    name: "Data Warehouse",
    description: "Consolidate analytics pipelines into a single governed warehouse.",
    progress: 100,
    daysRemaining: 0,
    tasks: 9,
    members: ["Tom", "Marcus"],
    status: "Completed",
    hasNotification: false,
    counts: { todo: 0, progress: 0, done: 4, approved: 5, total: 9 },
  },
  {
    id: "design-system",
    name: "Design System",
    description: "Maintain the shared component library and documentation site.",
    progress: 60,
    daysRemaining: 12,
    tasks: 14,
    members: ["Elena", "Amelia", "Sarah"],
    status: "On Hold",
    hasNotification: false,
    counts: { todo: 4, progress: 3, done: 4, approved: 3, total: 14 },
  },
]

export const comments = [
  {
    id: "c1",
    author: "John Carter",
    text: "The authentication API is ready for review. I've pushed the branch with the new token refresh flow.",
    time: "10:42 AM",
  },
  {
    id: "c2",
    author: "Sarah Lin",
    text: "Nice work. I'll review it this afternoon and leave notes on the PR.",
    time: "10:51 AM",
  },
  {
    id: "c3",
    author: "Marcus Webb",
    text: "Reminder that we froze the palette yesterday, so please pull the latest tokens before merging.",
    time: "11:15 AM",
  },
]

// Deadlines used by the calendar. Keyed by day-of-month for August 2026.
export const calendarDeadlines = [
  { day: 8, project: "Website Redesign", label: "Palette sign-off", accent: "#55917F" },
  { day: 12, project: "Design System", label: "Token review", accent: "#6BAB90" },
  { day: 17, project: "Website Redesign", label: "Analytics build", accent: "#38023B" },
  { day: 18, project: "Auth System", label: "Auth page design", accent: "#38023B" },
  { day: 21, project: "E-commerce", label: "Funnel audit", accent: "#55917F" },
  { day: 25, project: "Auth System", label: "API docs", accent: "#6BAB90" },
  { day: 26, project: "Mobile App v2", label: "Release candidate", accent: "#2E382E" },
]

export const notifications = [
  { id: "n1", text: "Sarah commented on Website Redesign", time: "2m ago", unread: true },
  { id: "n2", text: "Task “Build dashboard analytics” is due tomorrow", time: "1h ago", unread: true },
  { id: "n3", text: "Marcus approved “Finalize brand palette”", time: "3h ago", unread: false },
]
