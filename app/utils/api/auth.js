const BASE_URL = "https://r4sb8ngs-3000.brs.devtunnels.ms/api";

export async function loginMobile(email, senha) {
  try {
    const response = await fetch(`${BASE_URL}/mobile/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { ok: false, message: data.error || "Erro ao efetuar login" };
    }

    return { ok: true, user: data };
  } catch (err) {
    return { ok: false, message: "Erro de conexão" };
  }
}

