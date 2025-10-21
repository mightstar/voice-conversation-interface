# Voice Conversation Interface

An AI-powered voice conversation training platform built with Next.js, featuring real-time speech recognition, text-to-speech synthesis, and live coaching feedback.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)
![Zustand](https://img.shields.io/badge/Zustand-4.0-orange)

## 🎯 Features

- 🎤 **Real-time Voice Recognition** - Browser-based speech-to-text with interim results
- 🔊 **Text-to-Speech** - Natural AI voice responses using Web Speech API
- 💬 **Live Transcription** - Real-time conversation display with chat-style UI
- 🎯 **Live Coaching** - Context-aware hints and suggestions during conversations
- 📊 **Performance Assessment** - Detailed scoring across multiple categories
- 🎨 **Modern UI** - Beautiful, responsive interface with smooth animations
- ♿ **Accessible** - WCAG compliant with keyboard navigation support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Modern browser (Chrome, Edge, or Safari for voice features)
- Microphone access for voice input

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd voice-conversation-interface

# Install dependencies
npm install
# or
yarn install

# Run development server
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Setup

No environment variables required! The app uses browser APIs and mock data.

### Building for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
voice-conversation-interface/
├── app/                    # Next.js App Router
│   └── page.tsx           # Main application entry
├── containers/            # Smart components (business logic)
│   ├── SessionSetupContainer.tsx
│   ├── ConversationContainer.tsx
│   └── AssessmentContainer.tsx
├── components/            # Presentational components
│   ├── common/           # Shared components
│   ├── conversation/     # Conversation feature
│   ├── assessment/       # Assessment feature
│   ├── session/          # Session setup feature
│   └── ui/              # UI primitives
├── lib/                  # Utilities & business logic
│   ├── hooks/           # Custom React hooks
│   ├── store.ts         # Global state (Zustand)
│   ├── types.ts         # TypeScript types
│   └── data.ts          # Mock data
└── docs/                # Documentation
```

See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) for detailed architecture.

## 🏗️ Technical Architecture

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.x | React framework with App Router |
| **TypeScript** | 5.x | Type safety and developer experience |
| **Tailwind CSS** | 3.x | Utility-first styling |
| **Framer Motion** | 11.x | Smooth animations and transitions |
| **Zustand** | 4.x | Lightweight state management |
| **shadcn/ui** | Latest | High-quality UI components |
| **Lucide React** | Latest | Beautiful icon library |

### Key Libraries & APIs

#### Voice Processing
- **Web Speech API** - Browser-native speech recognition and synthesis
  - `SpeechRecognition` for real-time voice-to-text
  - `SpeechSynthesis` for text-to-voice responses
  - Continuous recognition with interim results
  - Automatic restart on speech end

#### State Management
- **Zustand** - Simple, scalable state management
  - Global conversation state
  - Message history
  - Coaching hints
  - Assessment results

#### UI Components
- **shadcn/ui** - Accessible, customizable components
  - Built on Radix UI primitives
  - Full keyboard navigation
  - Dark mode support
  
#### Animations
- **Framer Motion** - Production-ready animations
  - Page transitions
  - Component enter/exit
  - Speaking animations
  - Smooth state changes

### Architecture Patterns

1. **Container/Component Pattern**
   - Containers: Business logic and state management
   - Components: Pure presentational UI
   - Clear separation of concerns

2. **Feature-based Organization**
   - Components grouped by feature (conversation, assessment, session)
   - Common components shared across features
   - Easy to scale and maintain

3. **TypeScript-First**
   - Full type coverage
   - Type-safe props and state
   - Better IDE support and refactoring

See [docs/TECHNICAL_DECISIONS.md](./docs/TECHNICAL_DECISIONS.md) for detailed technical rationale.

## 🎨 Design System

The application uses a comprehensive design system built on:

- **Color Palette**: Semantic colors with dark mode support
- **Typography**: Inter font family with consistent scale
- **Spacing**: 4px base unit with consistent rhythm
- **Components**: Reusable, accessible UI components
- **Animations**: Smooth, purposeful motion design

See [docs/DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md) for the complete design system.

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Build (includes type checking)
npm run build
```

## 📝 Known Limitations

### Browser Compatibility
- ⚠️ **Voice features require modern browsers** (Chrome, Edge, Safari)
  - Firefox has limited speech recognition support
  - Mobile browsers may have varying support
- **Solution**: Fallback UI for unsupported browsers with clear messaging

### Speech Recognition
- ⚠️ **Requires HTTPS or localhost** for security
  - Production deployment must use HTTPS
- ⚠️ **Network-dependent** - Recognition happens on device but may require connection
- ⚠️ **Language support** - Currently English only
  - API supports multiple languages but app is hardcoded to `en-US`

### Mock Data
- ⚠️ **No backend integration** - All data is local/mock
  - Personas and scenarios are hardcoded
  - Assessments use rule-based scoring
  - No persistence across sessions

### Performance
- ⚠️ **Memory usage** - Long conversations can accumulate messages
  - No pagination or message cleanup
  - Full conversation kept in memory

## 🚀 What I'd Do With More Time

### High Priority

#### 1. Backend Integration
```typescript
// Real API integration
- User authentication (OAuth, JWT)
- Conversation persistence (PostgreSQL/MongoDB)
- Real AI models (OpenAI GPT-4, Claude)
- Advanced NLP for intent detection
- Historical session analytics
```

#### 2. Enhanced Voice Processing
```typescript
// Better voice handling
- Custom speech recognition (Deepgram, AssemblyAI)
- Voice activity detection (VAD)
- Noise cancellation and audio enhancement
- Multi-language support (20+ languages)
- Accent detection and adaptation
- Emotion detection in voice
```

#### 3. Advanced Features
```typescript
// Feature enhancements
- Video recording of sessions
- Screen sharing for visual context
- Multi-participant conversations
- Custom scenario builder
- Conversation templates
- Practice drills and exercises
```

### Medium Priority

#### 4. Testing & Quality
```typescript
// Comprehensive testing
- Unit tests (Jest, Vitest)
- Component tests (React Testing Library)
- E2E tests (Playwright)
- Visual regression tests
- Performance monitoring (Lighthouse CI)
- Error tracking (Sentry)
```

#### 5. UX Improvements
```typescript
// Better user experience
- Progressive Web App (PWA)
- Offline mode with service workers
- Push notifications
- Keyboard shortcuts overlay
- Tutorial/onboarding flow
- Accessibility audit & improvements
- Mobile-optimized interface
```

#### 6. Analytics & Insights
```typescript
// Data-driven improvements
- User behavior tracking
- Session heatmaps
- A/B testing framework
- Performance metrics dashboard
- ML-powered personalization
- Progress tracking over time
```

### Low Priority

#### 7. Advanced Coaching
```typescript
// Intelligent coaching
- Real-time sentiment analysis
- Tone and pace feedback
- Filler word detection
- Speaking pattern analysis
- Industry-specific coaching
- Customizable coaching rules
```

#### 8. Collaboration Features
```typescript
// Team features
- Shared scenarios across team
- Peer review system
- Coaching from managers
- Team leaderboards
- Group training sessions
```

#### 9. Enterprise Features
```typescript
// Scale for organizations
- SSO integration (SAML, OAuth)
- Role-based access control
- Team management
- Custom branding (white-label)
- API for integrations
- Usage analytics for admins
```

## 🤝 Contributing

This is a portfolio/assessment project, but suggestions and feedback are welcome!

## 📄 License

This project is for educational/assessment purposes.

## 📚 Additional Documentation

- [Architecture Guide](./docs/ARCHITECTURE.md) - Detailed architectural decisions
- [Design System](./docs/DESIGN_SYSTEM.md) - Complete design system documentation  
- [Technical Decisions](./docs/TECHNICAL_DECISIONS.md) - Why we chose each technology
- [Deployment Guide](./docs/DEPLOYMENT.md) - How to deploy to production

## 🙋 Questions or Issues?

For questions about this project, please review the documentation in the `docs/` folder.

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies**
