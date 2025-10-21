# Design System

A comprehensive design system for the Voice Conversation Interface, ensuring consistency, accessibility, and scalability.

## 🎨 Design Principles

### 1. **Clarity First**
Every element should communicate its purpose clearly. Users should instantly understand what they can do and what's happening.

### 2. **Responsive & Adaptive**
Design works seamlessly across all screen sizes and adapts to user preferences (dark mode, reduced motion).

### 3. **Accessible by Default**
WCAG 2.1 Level AA compliance. Every interaction works with keyboard, screen readers, and assistive technologies.

### 4. **Performance Matters**
Smooth animations, fast load times, and efficient rendering. Design shouldn't compromise performance.

### 5. **Delightful Interactions**
Subtle animations and feedback make the experience enjoyable without being distracting.

---

## 🎨 Color System

### Base Palette

```typescript
const colors = {
  // Primary - Action & Focus
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',  // Primary blue
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  
  // Secondary - Accents
  purple: {
    500: '#a855f7',
    600: '#9333ea',
  },
  
  // Status Colors
  success: '#10b981',  // Green
  warning: '#f59e0b',  // Orange
  error: '#ef4444',    // Red
  info: '#3b82f6',     // Blue
  
  // Neutrals
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};
```

### Semantic Colors

#### Light Mode
```css
--background: 0 0% 100%;           /* White */
--foreground: 222 47% 11%;         /* Near black */
--primary: 221 83% 53%;            /* Blue 500 */
--secondary: 210 40% 96%;          /* Gray 50 */
--accent: 210 40% 96%;
--muted: 210 40% 96%;
--destructive: 0 84% 60%;          /* Red */
```

#### Dark Mode
```css
--background: 222 47% 11%;         /* Near black */
--foreground: 210 40% 98%;         /* Near white */
--primary: 217 91% 60%;            /* Blue 400 */
--secondary: 217 33% 17%;          /* Dark blue-gray */
--accent: 217 33% 17%;
--muted: 217 33% 17%;
--destructive: 0 63% 31%;          /* Dark red */
```

### Usage Guidelines

#### Primary Blue
- **Use for**: Primary actions, links, focus states
- **Don't use for**: Large backgrounds, text body
- **Accessibility**: Meets AA contrast on white background

#### Purple Accents
- **Use for**: Selected states, secondary highlights
- **Don't use for**: Primary actions
- **Example**: Scenario selection borders

#### Status Colors
```typescript
// Success - Positive feedback
<Badge variant="success">Connected</Badge>

// Warning - Caution states
<Badge variant="warning">Processing</Badge>

// Error - Problems or blocks
<Badge variant="error">Connection lost</Badge>

// Info - Neutral information
<Badge variant="info">Listening...</Badge>
```

---

## 📝 Typography

### Font Family

```css
font-family: 'Inter', system-ui, -apple-system, sans-serif;
```

**Why Inter?**
- Optimized for digital interfaces
- Excellent readability at all sizes
- Comprehensive character set
- Open source and free

### Type Scale

```typescript
const typography = {
  // Display - Hero sections
  display: {
    size: '3.75rem',    // 60px
    lineHeight: '1',
    weight: '800',
  },
  
  // Headings
  h1: {
    size: '2.25rem',    // 36px
    lineHeight: '2.5rem',
    weight: '700',
  },
  h2: {
    size: '1.875rem',   // 30px
    lineHeight: '2.25rem',
    weight: '700',
  },
  h3: {
    size: '1.5rem',     // 24px
    lineHeight: '2rem',
    weight: '600',
  },
  h4: {
    size: '1.25rem',    // 20px
    lineHeight: '1.75rem',
    weight: '600',
  },
  
  // Body
  large: {
    size: '1.125rem',   // 18px
    lineHeight: '1.75rem',
    weight: '400',
  },
  base: {
    size: '1rem',       // 16px
    lineHeight: '1.5rem',
    weight: '400',
  },
  small: {
    size: '0.875rem',   // 14px
    lineHeight: '1.25rem',
    weight: '400',
  },
  tiny: {
    size: '0.75rem',    // 12px
    lineHeight: '1rem',
    weight: '400',
  },
};
```

### Usage Examples

```tsx
// Page title
<h1 className="text-4xl font-bold">
  Voice Conversation Practice
</h1>

// Section heading
<h2 className="text-2xl font-semibold">
  Select a Persona
</h2>

// Card title
<h3 className="text-lg font-semibold">
  Customer Service Agent
</h3>

// Body text
<p className="text-base">
  Practice realistic customer service scenarios...
</p>

// Secondary text
<span className="text-sm text-muted-foreground">
  Duration: 5 minutes
</span>

// Tiny labels
<span className="text-xs text-muted-foreground">
  #12345
</span>
```

---

## 📏 Spacing System

### Base Unit: 4px

```typescript
const spacing = {
  0: '0px',
  1: '4px',      // 0.25rem
  2: '8px',      // 0.5rem
  3: '12px',     // 0.75rem
  4: '16px',     // 1rem
  5: '20px',     // 1.25rem
  6: '24px',     // 1.5rem
  8: '32px',     // 2rem
  10: '40px',    // 2.5rem
  12: '48px',    // 3rem
  16: '64px',    // 4rem
  20: '80px',    // 5rem
  24: '96px',    // 6rem
};
```

### Usage Guidelines

```tsx
// Tight spacing - Related items
<div className="space-y-2">  {/* 8px gap */}
  <Label />
  <Input />
</div>

// Medium spacing - Card content
<Card className="p-4">  {/* 16px padding */}
  <CardContent className="space-y-4">  {/* 16px gap */}
    ...
  </CardContent>
</Card>

// Loose spacing - Sections
<div className="space-y-6">  {/* 24px gap */}
  <Section />
  <Section />
</div>

// Page margins
<div className="p-6 md:p-8">  {/* 24px mobile, 32px desktop */}
  ...
</div>
```

---

## 🎭 Components

### Button

```tsx
// Primary - Main actions
<Button variant="default">
  Start Session
</Button>

// Secondary - Less emphasis
<Button variant="secondary">
  Cancel
</Button>

// Outline - Tertiary actions
<Button variant="outline">
  Learn More
</Button>

// Ghost - Minimal actions
<Button variant="ghost">
  Skip
</Button>

// Destructive - Dangerous actions
<Button variant="destructive">
  End Session
</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
```

### Card

```tsx
// Basic card
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Main content here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Interactive card
<Card className="cursor-pointer hover:border-primary transition-all">
  ...
</Card>
```

### Avatar

```tsx
// Default avatar
<Avatar>
  <AvatarImage src="/avatar.jpg" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

// Speaking state
<Avatar 
  isSpeaking={true}
  className="ring-4 ring-blue-500 animate-pulse"
/>

// Sizes
<Avatar className="h-8 w-8" />   // Small
<Avatar className="h-12 w-12" /> // Default
<Avatar className="h-24 w-24" /> // Large
```

### Badge

```tsx
// Status badges
<Badge variant="default">Active</Badge>
<Badge variant="secondary">Draft</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">New</Badge>
```

---

## 🎬 Animation System

### Duration Scale

```typescript
const duration = {
  fast: '150ms',      // Quick feedback
  base: '200ms',      // Default transitions
  slow: '300ms',      // Deliberate movements
  slower: '500ms',    // Page transitions
};
```

### Easing Functions

```css
/* Natural motion */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Emphasis on start */
--ease-out: cubic-bezier(0, 0, 0.2, 1);

/* Emphasis on end */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
```

### Common Animations

#### Fade In
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.2 }}
>
  Content
</motion.div>
```

#### Slide In
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

#### Scale
```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  Click me
</motion.button>
```

#### Pulse (Speaking indicator)
```tsx
<motion.div
  animate={{
    scale: [1, 1.2, 1],
    opacity: [1, 0.8, 1],
  }}
  transition={{
    duration: 1,
    repeat: Infinity,
  }}
/>
```

### Animation Guidelines

✅ **Do:**
- Use animations to provide feedback
- Keep durations under 500ms
- Respect `prefers-reduced-motion`
- Make animations purposeful

❌ **Don't:**
- Animate without reason
- Use long, slow animations
- Animate large elements constantly
- Block user interaction

---

## 🔘 Icons

### Icon Library: Lucide React

```tsx
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Play,
  Pause,
  Check,
  X,
  AlertCircle,
  Info,
  // ... 1000+ more icons
} from 'lucide-react';
```

### Icon Sizes

```tsx
// Small - Inline with text
<Info className="h-4 w-4" />

// Default - Buttons, cards
<Mic className="h-5 w-5" />

// Large - Hero sections, empty states
<Volume2 className="h-8 w-8" />

// Extra large - Feature highlights
<Check className="h-12 w-12" />
```

### Icon Colors

```tsx
// Inherit text color
<Mic className="h-5 w-5" />

// Semantic colors
<Check className="h-5 w-5 text-green-500" />
<X className="h-5 w-5 text-red-500" />
<Info className="h-5 w-5 text-blue-500" />

// Muted
<Volume2 className="h-5 w-5 text-muted-foreground" />
```

---

## 📱 Responsive Design

### Breakpoints

```typescript
const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet portrait
  lg: '1024px',  // Tablet landscape
  xl: '1280px',  // Desktop
  '2xl': '1536px', // Large desktop
};
```

### Mobile-First Approach

```tsx
// Base styles for mobile, then scale up
<div className="
  p-4           {/* Mobile: 16px padding */}
  md:p-6        {/* Tablet: 24px padding */}
  lg:p-8        {/* Desktop: 32px padding */}
  
  text-sm       {/* Mobile: 14px */}
  md:text-base  {/* Tablet: 16px */}
  
  grid-cols-1   {/* Mobile: 1 column */}
  md:grid-cols-2 {/* Tablet: 2 columns */}
  lg:grid-cols-3 {/* Desktop: 3 columns */}
">
  Content
</div>
```

### Touch Targets

```tsx
// Minimum 44x44px for touch
<Button className="min-h-11 min-w-11 md:min-h-10 md:min-w-10">
  <Mic className="h-5 w-5" />
</Button>
```

---

## ♿ Accessibility

### Color Contrast

- **Text on backgrounds**: Minimum 4.5:1 (AA)
- **Large text**: Minimum 3:1 (AA)
- **UI components**: Minimum 3:1 (AA)

### Focus States

```tsx
// All interactive elements have visible focus
<Button className="
  focus:outline-none 
  focus:ring-2 
  focus:ring-primary 
  focus:ring-offset-2
">
  Accessible Button
</Button>
```

### Keyboard Navigation

```tsx
// Support Enter and Space for activation
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Custom Button
</div>
```

### Screen Reader Support

```tsx
// Descriptive labels
<Button aria-label="Start voice recording">
  <Mic className="h-5 w-5" />
</Button>

// Live regions for dynamic content
<div 
  role="status" 
  aria-live="polite"
  aria-atomic="true"
>
  {statusMessage}
</div>

// Hidden labels for context
<span className="sr-only">
  Current status: {status}
</span>
```

---

## 🎨 Design Tokens

### CSS Variables

```css
:root {
  /* Spacing */
  --spacing-unit: 4px;
  
  /* Borders */
  --border-radius-sm: 0.375rem;  /* 6px */
  --border-radius: 0.5rem;       /* 8px */
  --border-radius-md: 0.75rem;   /* 12px */
  --border-radius-lg: 1rem;      /* 16px */
  --border-width: 1px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  
  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 📦 Component Patterns

### Loading States

```tsx
// Skeleton loading
<Skeleton className="h-24 w-full" />

// Spinner
<Loader2 className="h-6 w-6 animate-spin" />

// Full-page loading
<LoadingScreen />
```

### Empty States

```tsx
<div className="text-center py-12">
  <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
  <h3 className="text-lg font-semibold mb-2">
    No conversations yet
  </h3>
  <p className="text-muted-foreground mb-4">
    Start your first conversation to begin
  </p>
  <Button>Get Started</Button>
</div>
```

### Error States

```tsx
<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Something went wrong. Please try again.
  </AlertDescription>
</Alert>
```

---

## 🎯 Best Practices

### Do's ✅

1. **Use semantic HTML**
   ```tsx
   <button> not <div onClick>
   <nav> for navigation
   <main> for main content
   ```

2. **Prefer composition**
   ```tsx
   // Good
   <Card>
     <CardHeader>...</CardHeader>
   </Card>
   
   // Avoid
   <Card headerTitle="..." />
   ```

3. **Use Tailwind utilities**
   ```tsx
   className="p-4 text-lg font-semibold"
   ```

4. **Add loading and error states**
   ```tsx
   {isLoading && <Skeleton />}
   {error && <ErrorMessage />}
   {data && <Content />}
   ```

### Don'ts ❌

1. **Don't inline complex styles**
   ```tsx
   // Bad
   <div style={{padding: '16px', margin: '8px'}} />
   ```

2. **Don't skip semantic markup**
   ```tsx
   // Bad
   <div onClick={handleClick}>Click me</div>
   
   // Good
   <button onClick={handleClick}>Click me</button>
   ```

3. **Don't hardcode values**
   ```tsx
   // Bad
   <div className="mb-[13px]" />
   
   // Good
   <div className="mb-3" />
   ```

---

## 📚 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion)
- [Lucide Icons](https://lucide.dev)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref)
- [Inter Font](https://rsms.me/inter)

---

**Design System maintained for Voice Conversation Interface**

