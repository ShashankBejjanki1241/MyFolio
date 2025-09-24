import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()
    
    if (!email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // For development, we'll just log the email
    // In production, you would use Resend API:
    /*
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Portfolio <hello@yourdomain.com>',
        to: 'you@yourdomain.com',
        subject: `New message from ${name || 'Visitor'}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name || 'Not provided'}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `
      })
    })

    if (!resp.ok) {
      const errorData = await resp.json()
      throw new Error(`Email service error: ${errorData.message || 'Unknown error'}`)
    }
    */

    // Development response
    console.log('Contact form submission:', { name, email, message })
    
    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your message! I\'ll get back to you soon.' 
    })
    
  } catch (err: any) {
    console.error('Contact form error:', err)
    return NextResponse.json({ 
      error: 'Failed to send message. Please try again later.' 
    }, { status: 500 })
  }
}
