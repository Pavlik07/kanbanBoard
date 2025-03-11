interface Issue {
  id: number;
  title: string;
  html_url: string;
  state: string;
  assignee: { login: string } | null;
  created_at: string;
  reactions: {
    total_count: number;
  };
  user: {
    login: string;
  };
}
  
interface RepoState {
    [repoUrl: string]: {
      todo: Issue[];
      inProgress: Issue[];
      done: Issue[];
      loading: boolean;
      error: string | null;
      [key: string]: any;
    };
}

interface RepoUrlState {
  repoUrl: string;
}

export interface RepoIssues {
  todo: Issue[];
  inProgress: Issue[];
  done: Issue[];
  loading: boolean;
  error: string | null;
}

interface DragOverlayIssueProps {
  issue: Issue;
}

interface IssueCardProps {
  id: string;
  issue: Issue | null;
}

interface KanbanColumnProps {
  column: string;
  issues: (Issue | null)[];
}

interface RepoLinksProps {
  owner: string;
  repoName: string;
  repoUrl: string;
}

export type {Issue, RepoState, RepoUrlState, DragOverlayIssueProps, IssueCardProps, KanbanColumnProps, RepoLinksProps}