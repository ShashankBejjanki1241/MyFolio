# Contributing to ExtMac Portfolio

Thank you for your interest in contributing to the ExtMac Portfolio project! This document provides guidelines and information for contributors.

## 🚀 Quick Start

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/MyFolio.git`
3. Install dependencies: `cd portfolio && npm install`
4. Start development server: `npm run dev`
5. Make your changes
6. Test your changes: `npm run lint && npm run type-check`
7. Submit a pull request

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/         # React components
│   │   ├── __tests__/      # Component tests
│   │   └── ...
│   └── utils/              # Utility functions
├── scripts/                # Build and deployment scripts
├── public/                 # Static assets
└── docs/                   # Documentation
```

## 🛠️ Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow the existing ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages

### Component Guidelines
- Use functional components with hooks
- Implement proper TypeScript interfaces
- Add PropTypes or TypeScript types
- Write tests for new components
- Follow accessibility best practices

### Testing
- Write unit tests for utilities
- Write component tests for React components
- Test both success and error cases
- Aim for good test coverage

## 🎯 Areas for Contribution

### High Priority
- [ ] Add more comprehensive tests
- [ ] Improve accessibility features
- [ ] Optimize performance metrics
- [ ] Add internationalization support
- [ ] Implement dark mode improvements

### Medium Priority
- [ ] Add more 3D models and animations
- [ ] Improve mobile responsiveness
- [ ] Add more project showcase features
- [ ] Implement advanced SEO features
- [ ] Add blog functionality

### Low Priority
- [ ] Add more customization options
- [ ] Implement advanced analytics
- [ ] Add social media integration
- [ ] Create more documentation

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Type checking
npm run type-check
```

### Writing Tests
- Place tests in `__tests__` directories
- Use descriptive test names
- Test both happy path and edge cases
- Mock external dependencies

## 📝 Pull Request Process

1. **Create a feature branch**: `git checkout -b feature/your-feature-name`
2. **Make your changes**: Follow the coding guidelines
3. **Test your changes**: Ensure all tests pass
4. **Update documentation**: If needed
5. **Commit your changes**: Use conventional commit messages
6. **Push to your fork**: `git push origin feature/your-feature-name`
7. **Create a Pull Request**: Provide a clear description

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] New tests added (if applicable)
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

## 🐛 Bug Reports

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser/device information
- Screenshots (if applicable)

## 💡 Feature Requests

For feature requests, please:
- Describe the feature clearly
- Explain the use case
- Consider implementation complexity
- Check if it aligns with project goals

## 📋 Code Review Guidelines

### For Contributors
- Respond to feedback promptly
- Make requested changes
- Ask questions if unclear
- Keep PRs focused and small

### For Reviewers
- Be constructive and helpful
- Test the changes locally
- Check for security issues
- Ensure code quality

## 🔒 Security

- Never commit sensitive information
- Use environment variables for secrets
- Follow security best practices
- Report security issues privately

## 📞 Getting Help

- Check existing issues and discussions
- Join our community discussions
- Contact maintainers for urgent issues

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to ExtMac Portfolio! 🎉
