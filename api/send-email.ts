import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      error: "Método no permitido",
    });
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("Falta configurar RESEND_API_KEY");
    return res.status(500).json({
      error: "El servicio de correo no está configurado",
    });
  }

  const { name, email, message } = req.body ?? {};

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !message.trim()
  ) {
    return res.status(400).json({
      error: "Todos los campos son obligatorios",
    });
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanMessage = message.trim();

  if (
    cleanName.length > 100 ||
    cleanEmail.length > 254 ||
    cleanMessage.length > 5000 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
  ) {
    return res.status(400).json({
      error: "Revisa los datos ingresados",
    });
  }

  try {
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: "La Jardinera <onboarding@resend.dev>",
      to: ["m.grilloberde3@gmail.com"],
      replyTo: cleanEmail,
      subject: `${cleanName} intenta comunicarse contigo`,
      html: `
        <h2>Nuevo mensaje de La Jardinera</h2>
        <p>${escapeHtml(cleanMessage).replace(/\n/g, "<br>")}</p>
        <p><strong>Nombre:</strong> ${escapeHtml(cleanName)}</p>
        <p><strong>Correo:</strong> ${escapeHtml(cleanEmail)}</p>
      `,
    });

    if (error) {
      console.error("Resend rechazó el envío:", error);
      return res.status(502).json({
        error: "No se pudo enviar el correo",
      });
    }

    return res.status(200).json({
      success: true,
      id: data?.id,
    });
  } catch (error) {
    console.error("Error inesperado al enviar el correo:", error);

    return res.status(500).json({
      error: "Error interno al enviar el correo",
    });
  }
}