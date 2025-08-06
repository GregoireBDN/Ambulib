/**
 * Tests pour les composants d'authentification
 * Axés sur l'accessibilité WCAG 2.1 AA
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'

import { AuthCard } from './AuthCard'
import { AuthFormField } from './AuthFormField'
import { PasswordInput } from './PasswordInput'
import { AuthButton } from './AuthButton'
import { AuthErrorAlert } from './AuthErrorAlert'
import { SignInForm } from './SignInForm'
import { SignUpForm } from './SignUpForm'

describe('AuthCard', () => {
  it('rend correctement avec le titre et la description', () => {
    render(
      <AuthCard title="Test Title" description="Test Description">
        <div>Content</div>
      </AuthCard>
    )
    
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText('Utilisez Tab pour naviguer, Entrée pour valider')).toBeInTheDocument()
  })

  it('respecte les standards d\'accessibilité', async () => {
    const { container } = render(
      <AuthCard title="Accessible Card" description="Description">
        <button>Test Button</button>
      </AuthCard>
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})

describe('AuthFormField', () => {
  it('rend un champ avec label et description', () => {
    render(
      <AuthFormField 
        label="Email" 
        description="Entrez votre email"
        placeholder="test@example.com"
      />
    )
    
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByText('Entrez votre email')).toBeInTheDocument()
  })

  it('affiche les erreurs correctement', () => {
    const errors = ['Email invalide', 'Email requis']
    render(
      <AuthFormField 
        label="Email" 
        error={errors}
      />
    )
    
    errors.forEach(error => {
      expect(screen.getByText(error)).toBeInTheDocument()
    })
    
    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('marque les champs requis avec *', () => {
    render(
      <AuthFormField 
        label="Email" 
        required
      />
    )
    
    expect(screen.getByText('*')).toBeInTheDocument()
    expect(screen.getByText('*')).toHaveAttribute('aria-label', 'champ obligatoire')
  })

  it('respecte les standards d\'accessibilité', async () => {
    const { container } = render(
      <AuthFormField label="Test Field" description="Description" />
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})

describe('PasswordInput', () => {
  it('toggle la visibilité du mot de passe', async () => {
    const user = userEvent.setup()
    render(<PasswordInput label="Password" />)
    
    const input = screen.getByLabelText('Password')
    const toggleButton = screen.getByLabelText('Afficher le mot de passe')
    
    expect(input).toHaveAttribute('type', 'password')
    
    await user.click(toggleButton)
    expect(input).toHaveAttribute('type', 'text')
    expect(screen.getByLabelText('Masquer le mot de passe')).toBeInTheDocument()
  })

  it('affiche les exigences du mot de passe', () => {
    render(<PasswordInput label="Mot de passe" />)
    
    expect(screen.getByText('Le mot de passe doit contenir :')).toBeInTheDocument()
    expect(screen.getByText('Au moins 8 caractères')).toBeInTheDocument()
  })

  it('respecte les standards d\'accessibilité', async () => {
    const { container } = render(<PasswordInput label="Password" />)
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})

describe('AuthButton', () => {
  it('affiche l\'état de chargement', () => {
    render(
      <AuthButton loading loadingText="Loading...">
        Submit
      </AuthButton>
    )
    
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('respecte la largeur pleine par défaut', () => {
    render(<AuthButton>Test</AuthButton>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('w-full')
  })
})

describe('AuthErrorAlert', () => {
  it('affiche les erreurs multiples', () => {
    const errors = ['Erreur 1', 'Erreur 2']
    render(<AuthErrorAlert error={errors} />)
    
    errors.forEach(error => {
      expect(screen.getByText(error)).toBeInTheDocument()
    })
  })

  it('peut être fermée', async () => {
    const user = userEvent.setup()
    const onDismiss = jest.fn()
    
    render(<AuthErrorAlert error="Test error" onDismiss={onDismiss} />)
    
    const closeButton = screen.getByLabelText('Fermer l\'alerte')
    await user.click(closeButton)
    
    expect(onDismiss).toHaveBeenCalled()
  })

  it('affiche l\'aide contextuelle pour les erreurs de mot de passe', () => {
    render(<AuthErrorAlert error="Mot de passe invalide" />)
    
    expect(screen.getByText(/Votre mot de passe doit contenir/)).toBeInTheDocument()
  })
})

describe('SignInForm', () => {
  it('soumet les données correctement', async () => {
    const user = userEvent.setup()
    const onSubmit = jest.fn()
    
    render(<SignInForm onSubmit={onSubmit} />)
    
    await user.type(screen.getByLabelText(/Adresse email/), 'test@example.com')
    await user.type(screen.getByLabelText(/Mot de passe/), 'password123')
    await user.click(screen.getByRole('button', { name: 'Se connecter' }))
    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      })
    })
  })

  it('désactive le bouton quand les champs sont vides', () => {
    render(<SignInForm onSubmit={jest.fn()} />)
    
    const submitButton = screen.getByRole('button', { name: 'Se connecter' })
    expect(submitButton).toBeDisabled()
  })

  it('respecte les standards d\'accessibilité', async () => {
    const { container } = render(<SignInForm onSubmit={jest.fn()} />)
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})

describe('SignUpForm', () => {
  it('soumet les données obligatoires', async () => {
    const user = userEvent.setup()
    const onSubmit = jest.fn()
    
    render(<SignUpForm onSubmit={onSubmit} />)
    
    await user.type(screen.getByLabelText(/Prénom/), 'Jean')
    await user.type(screen.getByLabelText(/Nom/), 'Dupont')
    await user.type(screen.getByLabelText(/Adresse email/), 'jean@example.com')
    await user.type(screen.getByLabelText(/Mot de passe/), 'password123')
    
    await user.click(screen.getByRole('button', { name: 'Créer mon compte' }))
    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'jean@example.com',
        password: 'password123'
      })
    })
  })

  it('affiche/masque les champs optionnels', async () => {
    const user = userEvent.setup()
    render(<SignUpForm onSubmit={jest.fn()} />)
    
    const toggleButton = screen.getByText('Afficher les informations optionnelles')
    expect(screen.queryByLabelText(/Âge/)).not.toBeInTheDocument()
    
    await user.click(toggleButton)
    expect(screen.getByLabelText(/Âge/)).toBeInTheDocument()
    expect(screen.getByText('Masquer les informations optionnelles')).toBeInTheDocument()
  })

  it('respecte les standards d\'accessibilité', async () => {
    const { container } = render(<SignUpForm onSubmit={jest.fn()} />)
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})

describe('Navigation clavier', () => {
  it('permet la navigation complète au clavier dans SignInForm', async () => {
    const user = userEvent.setup()
    render(<SignInForm onSubmit={jest.fn()} />)
    
    // Le premier champ devrait avoir le focus automatiquement (autoFocus)
    expect(screen.getByLabelText(/Adresse email/)).toHaveFocus()
    
    // Tab vers le champ mot de passe
    await user.tab()
    expect(screen.getByLabelText(/Mot de passe/)).toHaveFocus()
    
    // Tab vers le bouton toggle du mot de passe
    await user.tab()
    expect(screen.getByLabelText('Afficher le mot de passe')).toHaveFocus()
  })
})