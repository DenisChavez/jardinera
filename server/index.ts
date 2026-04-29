import express from "express"
import cors from "cors";
import dotenv from "dotenv"
import { Resend } from "resend"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY_GRILLO);

app.post("/send-email", async (req, res) => {
    try{
        const { name, email, message } = req.body;

        if(!name || !email || !message){
            return res.status(400).json({ error: "Todos los campos son obligatorios"});
        }

        const respuesta = await resend.emails.send({
            from: "La Jardinera <onboarding@resend.dev>",
            to: ["m.grilloberde3@gmail.com"],
            subject: `${name.toUpperCase()} intenta comunicarse contigo`,
            html: `
                <h2>Hola Grillo, he navegado por tu web y me han gustado tus productos.</h2>
                <p>${message}</p>
                <p>
                    Esta es mi información de contacto: </br>
                    <strong>Nombre:</strong>${name}
                    <strong>Email:</strong> ${email} 
                </p>
            `
        });

        res.status(200).json(respuesta);

    } catch (error){
        res.status(500).json({error: "Error enviando el correo"});
    }
});

app.listen(3001, () => {
    console.log(`Servidor corriendo en http://localhost:3001`);
});