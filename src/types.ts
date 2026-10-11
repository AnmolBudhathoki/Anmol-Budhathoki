export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'web' | 'ai' | 'security' | 'enterprise';
  description: string;
  tags: string[];
  metrics?: { label: string; value: string }[];
  status: 'Production' | 'Live Enterprise' | 'Research Lab' | 'Active Alpha' | 'Completed';
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  terminalSnippet?: {
    filename: string;
    lines: string[];
  };
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
  skills: { name: string; level: 'production' | 'expanding'; details?: string }[];
}

export interface ActivityLog {
  id: string;
  action: string;
  timestamp: string;
  category: string;
  status: 'success' | 'info' | 'warn';
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
  company: string;
  location: string;
  isAuthed: boolean;
  bookmarkedProjects: string[];
  savedNotes: { id: string; date: string; content: string }[];
}
