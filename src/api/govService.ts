const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export interface GovProfilePayload {
  age: string;
  occupation: string;
  income: string;
  location: string;
  category: string;
  gender: string;
  maritalStatus: string;
  education: string;
}

export async function createProfileReport(
  profile: GovProfilePayload,
  token: string
) {
  const res = await fetch(`${API_URL}/api/gov/report/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profile),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || `HTTP ${res.status}`);
  }

  return res.json();
}

export async function createSchemeReport(schemeName: string, token: string) {
  const res = await fetch(`${API_URL}/api/gov/report/scheme`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ schemeName }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || `HTTP ${res.status}`);
  }

  return res.json();
}

export async function getLatestGovReport(mode: "profile" | "scheme", token: string) {
  const res = await fetch(
    `${API_URL}/api/gov/report/latest?mode=${mode}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || `HTTP ${res.status}`);
  }

  return res.json();
}
