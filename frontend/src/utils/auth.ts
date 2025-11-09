// frontend/src/utils/auth.ts
export interface User {
  token: string;
  name: string;
  email: string;
  role: string;
  isNew?: boolean;
}

const USER_KEY = "aiden_user";

export const saveUser = (user: any) => {
  // 🧠 Handle both "username" or "name" from backend
  const normalized = {
    token: user.token ?? "",
    name: user.name ?? user.username ?? "User", // ✅ now supports both
    email: user.email ?? "",
    role: (user.role ?? "employee").toLowerCase(),
    isNew: user.isNew ?? false,
  };

  localStorage.setItem(USER_KEY, JSON.stringify(normalized));
};

export const getUser = (): User | null => {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    return {
      token: parsed.token ?? "",
      name: parsed.name ?? "User",
      email: parsed.email ?? "",
      role: (parsed.role ?? "employee").toLowerCase(),
      isNew: parsed.isNew ?? false,
    };
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
};

export const clearUser = () => {
  localStorage.removeItem(USER_KEY);
};

export const isNewUser = (): boolean => {
  const u = getUser();
  return !!u && !!u.isNew;
};

export const clearIsNewFlag = () => {
  const u = getUser();
  if (u) {
    u.isNew = false;
    saveUser(u);
  }
};
