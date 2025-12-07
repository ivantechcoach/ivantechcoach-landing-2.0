import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from '@/components/ContactForm'

// Mock fetch
global.fetch = jest.fn()

describe('ContactForm Component', () => {
  const mockContent = {
    title: 'Contacto',
    subtitle: 'Hablemos',
    description: 'Escríbeme y te responderé.',
    form: {
      name: 'Nombre',
      email: 'Email',
      message: 'Mensaje',
      submit: 'Enviar mensaje',
      sending: 'Enviando...',
      success: '¡Mensaje enviado!',
      error: 'Hubo un error.',
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render form fields', () => {
    render(<ContactForm content={mockContent} lang="es" />)
    
    expect(screen.getByLabelText(mockContent.form.name)).toBeInTheDocument()
    expect(screen.getByLabelText(mockContent.form.email)).toBeInTheDocument()
    expect(screen.getByLabelText(mockContent.form.message)).toBeInTheDocument()
  })

  it('should submit form successfully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    })

    render(<ContactForm content={mockContent} lang="es" />)
    
    const nameInput = screen.getByLabelText(mockContent.form.name)
    const emailInput = screen.getByLabelText(mockContent.form.email)
    const messageInput = screen.getByLabelText(mockContent.form.message)
    const submitButton = screen.getByRole('button', { name: mockContent.form.submit })

    await userEvent.type(nameInput, 'Test User')
    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(messageInput, 'This is a test message with enough characters')
    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          message: 'This is a test message with enough characters',
        }),
      })
    })

    await waitFor(() => {
      expect(screen.getByText(mockContent.form.success)).toBeInTheDocument()
    })
  })

  it('should handle API error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ success: false, error: 'Server error' }),
    })

    render(<ContactForm content={mockContent} lang="es" />)
    
    const nameInput = screen.getByLabelText(mockContent.form.name)
    const emailInput = screen.getByLabelText(mockContent.form.email)
    const messageInput = screen.getByLabelText(mockContent.form.message)
    const submitButton = screen.getByRole('button', { name: mockContent.form.submit })

    await userEvent.type(nameInput, 'Test User')
    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(messageInput, 'This is a test message with enough characters')
    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(mockContent.form.error)).toBeInTheDocument()
    })
  })

  it('should show loading state during submission', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(
      () => new Promise(resolve => setTimeout(() => resolve({
        ok: true,
        json: async () => ({ success: true }),
      }), 100))
    )

    render(<ContactForm content={mockContent} lang="es" />)
    
    const nameInput = screen.getByLabelText(mockContent.form.name)
    const emailInput = screen.getByLabelText(mockContent.form.email)
    const messageInput = screen.getByLabelText(mockContent.form.message)
    const submitButton = screen.getByRole('button', { name: mockContent.form.submit })

    await userEvent.type(nameInput, 'Test User')
    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(messageInput, 'This is a test message with enough characters')
    await userEvent.click(submitButton)

    expect(screen.getByText(mockContent.form.sending)).toBeInTheDocument()
    expect(submitButton).toBeDisabled()
  })

  it('should validate form fields', async () => {
    render(<ContactForm content={mockContent} lang="es" />)
    
    const submitButton = screen.getByRole('button', { name: mockContent.form.submit })
    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/El nombre es requerido/i)).toBeInTheDocument()
    })
  })
})

