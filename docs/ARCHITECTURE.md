# Application Architecture

## 📁 Project Structure

```
voice-conversation-interface/
├── app/                           # Next.js App Router
│   ├── page.tsx                  # Main entry point
│   └── layout.tsx                # Root layout
│
├── containers/                    # Smart Components (Business Logic)
│   ├── SessionSetupContainer.tsx # Session setup orchestration
│   ├── ConversationContainer.tsx # Voice conversation orchestration
│   └── AssessmentContainer.tsx   # Assessment/results orchestration
│
├── components/                    # Presentational Components
│   ├── common/                   # Shared reusable components
│   │   ├── avatar.tsx           # Avatar with speaking animation
│   │   ├── coaching-overlay.tsx # Real-time coaching hints
│   │   ├── loading-screen.tsx   # Loading state screen
│   │   ├── transcription.tsx    # Chat-style transcript display
│   │   ├── voice-indicator.tsx  # Microphone activity indicator
│   │   └── index.ts            # Public exports
│   │
│   ├── conversation/            # Conversation feature components
│   │   ├── conversation-header.tsx
│   │   ├── avatar-display.tsx
│   │   ├── conversation-controls.tsx
│   │   └── scenario-info-card.tsx
│   │
│   ├── assessment/              # Assessment feature components
│   │   ├── assessment-header.tsx
│   │   ├── assessment-score-display.tsx
│   │   ├── category-breakdown.tsx
│   │   ├── strengths-improvements.tsx
│   │   └── assessment-actions.tsx
│   │
│   ├── session/                 # Session setup components
│   │   ├── session-setup-header.tsx
│   │   ├── quick-start-card.tsx
│   │   ├── persona-selection-card.tsx
│   │   └── scenario-selection-card.tsx
│   │
│   └── ui/                      # UI Primitives (shadcn/ui)
│       ├── button.tsx
│       ├── card.tsx
│       ├── progress.tsx
│       └── ...
│
└── lib/                          # Utilities & Business Logic
    ├── hooks/                   # Custom React hooks
    │   └── use-voice.ts        # Speech recognition & synthesis
    ├── data.ts                 # Mock data (personas, scenarios)
    ├── store.ts                # Zustand global state management
    ├── types.ts                # TypeScript type definitions
    └── utils.ts                # Helper functions
```

## 🏗️ Architecture Principles

### 1. **Container/Component Pattern**

#### **Containers** (`containers/`)
Smart components that handle:
- ✅ Business logic and orchestration
- ✅ State management (local & global)
- ✅ Side effects (API calls, storage, etc.)
- ✅ Event handlers and data flow
- ✅ Composing multiple components together

**Examples:**
```typescript
// containers/ConversationContainer.tsx
- Manages conversation state
- Handles voice recognition logic
- Coordinates between header, avatar, controls
- Processes transcripts and AI responses
```

#### **Components** (`components/`)
Presentational components that are:
- ✅ Purely presentational (UI focused)
- ✅ Props-driven (no business logic)
- ✅ Reusable and composable
- ✅ Easy to test and maintain

**Examples:**
```typescript
// components/conversation/conversation-header.tsx
- Receives data via props
- Renders UI based on props
- Emits events via callbacks
- No direct state management
```

### 2. **Component Organization**

#### **Common Components** (`components/common/`)
- Used across multiple features
- Generic and reusable
- No feature-specific logic
- Examples: Avatar, LoadingScreen, Transcription

#### **Feature Components** (`components/{feature}/`)
- Specific to one feature
- Can only be used within that context
- Still presentational, just not reusable elsewhere
- Examples: ConversationHeader, AssessmentScoreDisplay

#### **UI Primitives** (`components/ui/`)
- Basic building blocks (buttons, cards, inputs)
- From shadcn/ui library
- No business logic whatsoever

### 3. **Dependency Flow**

```
app/page.tsx (orchestrates app state)
    ↓
containers/ (business logic)
    ↓
components/ (presentation)
    ↓
lib/ (utilities, hooks, state)
```

**Rules:**
- ✅ Containers import from `components/` and `lib/`
- ✅ Components import from other `components/` and `lib/`
- ✅ Components can be nested and composed
- ❌ No circular dependencies
- ❌ `lib/` never imports from `containers/` or `components/`
- ❌ Components never import from `containers/`

## 📦 Import Patterns

### Absolute Imports (Recommended)
```typescript
// ✅ Containers
import { ConversationContainer } from '@/containers/ConversationContainer';

// ✅ Components (via index)
import { Avatar, LoadingScreen } from '@/components/common';

// ✅ Components (direct)
import { ConversationHeader } from '@/components/conversation/conversation-header';

// ✅ Library utilities
import { useConversationStore } from '@/lib/store';
import { useVoice } from '@/lib/hooks/use-voice';
```

### Component Structure Example

```typescript
// ❌ Bad: Business logic in component
export function ConversationHeader() {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    // Fetching data, complex logic...
  }, []);
  
  return <header>...</header>;
}

// ✅ Good: Pure presentation
interface ConversationHeaderProps {
  personaName: string;
  isListening: boolean;
  onToggleCoaching: () => void;
}

export function ConversationHeader({
  personaName,
  isListening,
  onToggleCoaching
}: ConversationHeaderProps) {
  return <header>...</header>;
}
```

## 🎯 Key Benefits

### 1. **Clear Separation of Concerns**
- Business logic isolated in containers
- UI components are pure and testable
- Easy to understand data flow

### 2. **Maintainability**
- Changes to business logic don't affect UI
- UI changes don't affect business logic
- Clear file organization

### 3. **Reusability**
- Common components shared across features
- Components are composable
- Easy to build new features

### 4. **Scalability**
- Add new containers for new features
- Extend component libraries
- No coupling between features

### 5. **Team Collaboration**
- Junior devs can work on components
- Senior devs can work on containers
- Clear boundaries reduce conflicts

### 6. **Testing**
- Components: Visual/snapshot testing
- Containers: Integration testing
- Lib: Unit testing

## 📝 Best Practices

### Container Best Practices
```typescript
// ✅ Do
- Handle all business logic
- Manage state (useState, useReducer, store)
- Use hooks (useEffect, custom hooks)
- Compose multiple components
- Handle events and callbacks

// ❌ Don't
- Contain complex JSX
- Mix styling with logic
- Directly manipulate DOM
```

### Component Best Practices
```typescript
// ✅ Do
- Receive data via props
- Emit events via callbacks
- Focus on UI/UX
- Be small and focused
- Document props with TypeScript

// ❌ Don't
- Fetch data or call APIs
- Manage complex state
- Import from containers
- Have side effects
```

## 🔄 Adding New Features

### 1. Create a Container
```bash
# Create new container
touch containers/MyFeatureContainer.tsx
```

```typescript
// containers/MyFeatureContainer.tsx
export function MyFeatureContainer() {
  // Business logic here
  const [state, setState] = useState();
  
  return (
    <div>
      <MyFeatureHeader />
      <MyFeatureContent />
    </div>
  );
}
```

### 2. Create Components
```bash
# Create feature components
mkdir components/my-feature
touch components/my-feature/my-feature-header.tsx
```

```typescript
// components/my-feature/my-feature-header.tsx
interface MyFeatureHeaderProps {
  title: string;
}

export function MyFeatureHeader({ title }: MyFeatureHeaderProps) {
  return <header>{title}</header>;
}
```

### 3. Wire it up in App
```typescript
// app/page.tsx
import { MyFeatureContainer } from '@/containers/MyFeatureContainer';

export default function Home() {
  return <MyFeatureContainer />;
}
```

## 🎨 Component Design Guidelines

### Single Responsibility
Each component should do one thing well:
- ✅ `Avatar` - Shows avatar with animations
- ✅ `ConversationHeader` - Displays conversation header
- ✅ `VoiceIndicator` - Shows microphone activity

### Props Interface Design
```typescript
// ✅ Good: Clear, typed props
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

// ❌ Bad: Unclear, any types
interface ButtonProps {
  data: any;
  handler: Function;
}
```

### Composition over Inheritance
```typescript
// ✅ Good: Composable components
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>

// ❌ Bad: Prop drilling everything
<Card 
  title="Title"
  content="Content"
  headerProps={{...}}
  contentProps={{...}}
/>
```

## 📚 Further Reading

- [Container/Component Pattern](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
- [React Component Patterns](https://www.patterns.dev/posts/presentational-container-pattern)
- [Clean Architecture in React](https://dev.to/easybuoy/react-folder-structure-for-enterprise-level-applications-4h14)
