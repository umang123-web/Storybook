# AI Prompt Studio

A comprehensive prompt engineering interface for testing and optimizing AI interactions. Built with React, TypeScript, Tailwind CSS, and Motion for animations.

## Features

- **Model Selector**: Dropdown to choose between different AI models (GPT-4, GPT-3.5, Claude 2, Custom)
- **Prompt Editor**: Rich text area with save/load template functionality
- **Parameters Panel**: Interactive sliders for temperature, max tokens, top P, frequency penalty, and presence penalty
- **Chat/Output Area**: Displays conversation history with copy and download JSON capabilities
- **Theme Toggle**: Light/dark mode persisted in localStorage
- **Responsive Layout**: Optimized for mobile, tablet, and desktop
- **Accessibility**: Full keyboard navigation, ARIA labels, and focus states
- **Animations**: Smooth transitions using Motion (Framer Motion)

## Design System

### Design → Code Translation

This section explains how the mockup elements were translated into code:

#### 1. **Header Section**
- **Mockup**: Logo icon + title + theme toggle in top navigation
- **Code**: 
  - Used flexbox layout with `justify-between` for spacing
  - Gradient background for logo using Tailwind's `bg-gradient-to-br`
  - ThemeToggle component in top-right corner
  - Lucide-react icons for visual elements

#### 2. **Layout Grid**
- **Mockup**: Three-column responsive layout with sidebar + main content
- **Code**:
  - `grid grid-cols-1 lg:grid-cols-3` - Single column on mobile, three columns on desktop
  - Left sidebar (1 column): Model selector + Parameters panel
  - Main area (2 columns): Prompt editor + Chat output
  - Spacing: `gap-6` (1.5rem) between grid items

#### 3. **Model Selector Dropdown**
- **Mockup**: Custom dropdown with model info (provider, max tokens)
- **Code**:
  - Custom React component with state management
  - AnimatePresence for smooth open/close transitions
  - Keyboard navigation support (Escape to close, Tab to navigate)
  - Visual feedback: Check icon for selected item, chevron rotation

#### 4. **Parameter Sliders**
- **Mockup**: Labeled sliders with tooltips and numeric inputs
- **Code**:
  - Custom range input with dynamic background gradient
  - Info icon with hover tooltip using Motion animations
  - Dual input: slider + number field for precision
  - CSS custom properties for dynamic fill color

#### 5. **Prompt Editor**
- **Mockup**: Large text area with action buttons (Save/Load)
- **Code**:
  - Textarea with auto-resize capability
  - Template modal with grid layout
  - Character counter at bottom
  - Keyboard shortcut: Cmd/Ctrl + Enter to send

#### 6. **Chat Output**
- **Mockup**: Message bubbles with user/assistant distinction
- **Code**:
  - Scroll container with auto-scroll to latest message
  - Different background colors for user vs assistant
  - Avatar icons (User/Bot) with colored backgrounds
  - Copy button per message, download all as JSON
  - Collapsible parameters display using HTML details/summary

#### 7. **Theme Toggle**
- **Mockup**: Sun/Moon icon button in header
- **Code**:
  - React Context for global theme state
  - LocalStorage persistence
  - Icon rotation animation (180° on toggle)
  - Body class toggle for CSS custom property switching

### Tailwind Token Mapping

#### Colors
```css
--color-primary: #6366f1           /* Primary brand color (indigo) */
--color-primary-hover: #4f46e5     /* Hover state */
--color-background: #ffffff        /* Light mode background */
--color-surface: #f9fafb           /* Card/surface background */
--color-border: #e5e7eb            /* Border color */
--color-text-primary: #111827      /* Primary text */
--color-text-secondary: #6b7280    /* Secondary text */

/* Dark mode variants */
--color-dark-background: #0f172a
--color-dark-surface: #1e293b
--color-dark-border: #334155
--color-dark-text-primary: #f1f5f9
```

#### Spacing
```css
--spacing-xs: 0.25rem    /* 4px */
--spacing-sm: 0.5rem     /* 8px */
--spacing-md: 1rem       /* 16px */
--spacing-lg: 1.5rem     /* 24px */
--spacing-xl: 2rem       /* 32px */
--spacing-2xl: 3rem      /* 48px */
```

**Usage in Layout**:
- Component padding: `p-6` (1.5rem/24px)
- Grid gaps: `gap-6` (1.5rem/24px)
- Button padding: `px-4 py-3` or `px-6 py-2.5`
- Section margins: `mb-8`, `mt-12`

#### Typography
```css
h1: 2rem (32px), font-weight: 700, line-height: 2.5rem
h2: 1.5rem (24px), font-weight: 600, line-height: 2rem
h3: 1.25rem (20px), font-weight: 600, line-height: 1.75rem
p: 1rem (16px), line-height: 1.5rem
button: 0.875rem (14px), font-weight: 500
```

**Applied in Components**:
- Header title uses default `h1` styling
- Panel headings use `h3` styling
- Body text inherits default `p` styles
- No Tailwind font size classes used (per design system rules)

#### Border Radius
```css
--radius-sm: 0.375rem   /* 6px - small elements */
--radius-md: 0.5rem     /* 8px - buttons */
--radius-lg: 0.75rem    /* 12px - cards */
--radius-xl: 1rem       /* 16px - large containers */
```

**Mapped to Tailwind**:
- Cards/panels: `rounded-lg` (12px)
- Buttons: `rounded-md` (8px)
- Avatars: `rounded-full`
- Logo: `rounded-lg` (12px)

#### Shadows
```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1)
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)
```

**Usage**:
- Dropdown menu: `shadow-lg`
- Hover cards: `shadow-md` (via transition)
- Default cards: No shadow, border-only design

## Component Architecture

### Core Components

1. **ModelSelector.tsx**
   - Custom dropdown with keyboard navigation
   - AnimatePresence for smooth transitions
   - ARIA labels for accessibility

2. **PromptEditor.tsx**
   - Template management (save/load)
   - Character counter
   - Keyboard shortcuts (Cmd+Enter to send)

3. **ParametersPanel.tsx**
   - Dynamic parameter sliders
   - Tooltip information on hover
   - Synchronized slider + number input

4. **ChatOutput.tsx**
   - Auto-scrolling message list
   - Copy individual messages
   - Download entire conversation as JSON
   - Collapsible parameter details

5. **ThemeToggle.tsx**
   - Icon animation on toggle
   - LocalStorage persistence
   - System preference detection

### State Management

**AppContext.tsx**: React Context providing:
- Theme state (light/dark)
- Selected model
- Prompt parameters
- Message history
- Mock data (models, templates)
- Loading states

## Accessibility Features

- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ ARIA labels on all interactive elements
- ✅ Focus states with visible ring indicators
- ✅ Semantic HTML (header, main, aside, section, footer)
- ✅ Skip links implicit through proper heading structure
- ✅ Color contrast ratios meet WCAG AA standards
- ✅ Screen reader friendly (role="log" for chat, aria-expanded for dropdowns)

## Responsive Breakpoints

- **Mobile**: < 768px - Single column layout
- **Tablet**: 768px - 1024px - Adjusted spacing
- **Desktop**: > 1024px - Three-column grid layout

## Mock Data

The application uses mock data for:
- **Models**: GPT-4, GPT-3.5 Turbo, Claude 2, Custom Fine-tuned
- **Templates**: Code Review, Content Summary, Creative Brainstorm, Debug Helper
- **API Responses**: Simulated with setTimeout (1 second delay)

## Local Storage

Persisted data:
- Theme preference (`theme` key)
- Custom templates (component state, can be extended)

## Animations

Using Motion (Framer Motion):
- Button hover/tap states (`whileHover`, `whileTap`)
- Dropdown open/close (`initial`, `animate`, `exit`)
- Message appearance (`initial={{ opacity: 0, y: 20 }}`)
- Theme toggle icon rotation
- Tooltip fade-in effects

## Installation & Usage

This project is built for Figma Make and runs automatically. The key dependencies are:

```json
{
  "motion/react": "Latest",
  "lucide-react": "Latest",
  "sonner@2.0.3": "Toast notifications"
}
```

## Future Enhancements

- Storybook setup for component documentation
- Export/import conversation history
- Prompt versioning and comparison
- Advanced template categorization
- Real API integration guide
- Collaborative prompt sharing
