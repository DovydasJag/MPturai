export type Project = {
  id: string;
  name: string;
  owner: string;
  status: "active" | "paused" | "done";
  updatedAt: string;
};
