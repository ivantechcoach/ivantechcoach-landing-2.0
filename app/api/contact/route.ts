import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Email template HTML
function getEmailHTML(name: string, email: string, message: string, timestamp: string): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuevo mensaje de contacto</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
  <div style="background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <h1 style="color: #00d1ff; margin-top: 0; font-size: 24px; border-bottom: 2px solid #00d1ff; padding-bottom: 10px;">
      Nuevo mensaje de contacto
    </h1>
    
    <div style="margin-top: 25px;">
      <p style="margin: 10px 0;"><strong style="color: #555;">Nombre:</strong> ${escapeHtml(name)}</p>
      <p style="margin: 10px 0;"><strong style="color: #555;">Email:</strong> <a href="mailto:${escapeHtml(email)}" style="color: #00d1ff; text-decoration: none;">${escapeHtml(email)}</a></p>
      <p style="margin: 10px 0;"><strong style="color: #555;">Fecha:</strong> ${new Date(timestamp).toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'short' })}</p>
    </div>
    
    <div style="margin-top: 30px; padding: 20px; background-color: #f9f9f9; border-left: 4px solid #00d1ff; border-radius: 4px;">
      <h2 style="color: #333; margin-top: 0; font-size: 18px;">Mensaje:</h2>
      <p style="white-space: pre-wrap; margin: 0; color: #444;">${escapeHtml(message)}</p>
    </div>
    
    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #888; font-size: 12px;">
      <p style="margin: 0;">Este mensaje fue enviado desde el formulario de contacto de ivantechcoach.es</p>
    </div>
  </div>
</body>
</html>
  `.trim()
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Name must be at least 2 characters' },
        { status: 400 }
      )
    }

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: 'Message must be at least 10 characters' },
        { status: 400 }
      )
    }

    if (message.trim().length > 2000) {
      return NextResponse.json(
        { success: false, error: 'Message cannot exceed 2000 characters' },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitizedData = {
      name: name.trim().substring(0, 100),
      email: email.trim().toLowerCase().substring(0, 255),
      message: message.trim().substring(0, 2000),
      timestamp: new Date().toISOString(),
    }

    // Check for required environment variables
    const smtpHost = process.env.SMTP_HOST
    const smtpPort = process.env.SMTP_PORT
    const smtpUser = process.env.SMTP_USER
    const smtpPassword = process.env.SMTP_PASSWORD
    const contactEmail = process.env.CONTACT_EMAIL || 'contact@ivantechcoach.es'

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPassword) {
      console.error('[Contact API] Missing SMTP configuration:', {
        hasHost: !!smtpHost,
        hasPort: !!smtpPort,
        hasUser: !!smtpUser,
        hasPassword: !!smtpPassword,
        passwordIsPlaceholder: smtpPassword === 'TU_CONTRASEÑA_AQUI' || smtpPassword?.includes('TU_CONTRASEÑA')
      })
      return NextResponse.json(
        { 
          success: false, 
          error: smtpPassword === 'TU_CONTRASEÑA_AQUI' || smtpPassword?.includes('TU_CONTRASEÑA')
            ? 'Por favor configura la contraseña SMTP en el archivo .env.local'
            : 'Email service not configured. Please check your .env.local file.'
        },
        { status: 500 }
      )
    }

    // Create transporter
    const portNum = parseInt(smtpPort, 10)
    const isSecure = portNum === 465
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: portNum,
      secure: isSecure, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    })

    // Send email
    await transporter.sendMail({
      from: `"Ivan Tech Coach" <${smtpUser}>`,
      to: contactEmail,
      replyTo: sanitizedData.email,
      subject: `Nuevo mensaje de contacto de ${sanitizedData.name}`,
      html: getEmailHTML(
        sanitizedData.name,
        sanitizedData.email,
        sanitizedData.message,
        sanitizedData.timestamp
      ),
      text: `
Nuevo mensaje de contacto

Nombre: ${sanitizedData.name}
Email: ${sanitizedData.email}
Fecha: ${new Date(sanitizedData.timestamp).toLocaleString('es-ES')}

Mensaje:
${sanitizedData.message}
      `.trim(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    // Log error for debugging (server-side only)
    if (error instanceof Error) {
      console.error('[Contact API] Error processing form:', {
        message: error.message,
        name: error.name,
        stack: error.stack,
      })
      
      // Provide more specific error messages
      let errorMessage = 'Internal server error'
      if (error.message.includes('ECONNREFUSED') || error.message.includes('ETIMEDOUT')) {
        errorMessage = 'No se pudo conectar al servidor SMTP. Verifica la configuración.'
      } else if (error.message.includes('Invalid login') || error.message.includes('authentication')) {
        errorMessage = 'Error de autenticación SMTP. Verifica usuario y contraseña.'
      } else if (error.message.includes('ENOTFOUND')) {
        errorMessage = 'Servidor SMTP no encontrado. Verifica SMTP_HOST en .env.local'
      }
      
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 500 }
      )
    } else {
      console.error('[Contact API] Unknown error:', error)
      return NextResponse.json(
        { success: false, error: 'Internal server error' },
        { status: 500 }
      )
    }
  }
}
