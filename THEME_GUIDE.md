# Quick Theme Reference - Black & White Portfolio

## 🎨 Color Usage Guide

### When to Use Each Color

#### Backgrounds
- `bg-background` - Main page background (white/black)
- `bg-card` - Card backgrounds (white/dark gray)
- `bg-foreground/5` - Subtle tinted backgrounds
- `bg-foreground/10` - Light hover states

#### Text Colors
- `text-foreground` - Primary text (black/white)
- `text-muted-foreground` - Secondary text (gray)
- Default - Inherits foreground color

#### Borders
- `border-border` - Standard borders (light/dark gray)
- `border-foreground/10` - Subtle borders
- `border-foreground/20` - Hover borders

#### Effects
- `opacity-70` - Subtle hover effect
- `opacity-50` - Muted elements
- `shadow-xl` - Cards and important elements
- `shadow-2xl` - Hover states

---

## 🎯 Component Patterns

### Cards
```tsx
<Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:border-foreground/20">
  {/* Content */}
</Card>
```

### Buttons (Primary)
```tsx
<button className="bg-foreground text-background hover:opacity-80">
  {/* Text */}
</button>
```

### Buttons (Secondary)
```tsx
<button className="border-2 border-foreground/20 hover:bg-foreground/5">
  {/* Text */}
</button>
```

### Badges
```tsx
<Badge className="bg-foreground/5 border border-foreground/10">
  {/* Text */}
</Badge>
```

---

## 🔄 Hover Effects

### Standard Card Hover
```tsx
hover:shadow-2xl hover:scale-[1.02] transition-all duration-300
```

### Icon/Button Hover
```tsx
hover:scale-110 hover:bg-foreground/5 transition-all duration-200
```

### Text Hover
```tsx
hover:opacity-70 transition-opacity duration-300
```

---

## 📐 Spacing Scale

- **xs**: 0.5rem (8px)
- **sm**: 0.75rem (12px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 2.5rem (40px)
- **3xl**: 3rem (48px)

---

## 🎭 Animation Classes

### Custom Animations
- `animate-pulse` - Subtle pulsing effect
- `animate-spin-slow` - 20s rotation
- `animate-gradient-x` - Gradient movement
- `animate-float` - Floating motion

### Transition Durations
- `duration-200` - Fast (buttons, icons)
- `duration-300` - Standard (cards, text)
- `duration-500` - Slow (sections, large elements)

---

## 📱 Responsive Utilities

### Text Sizes
```tsx
text-xl sm:text-2xl lg:text-3xl
```

### Grid Layouts
```tsx
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
```

### Spacing
```tsx
px-4 sm:px-6 lg:px-8
py-8 sm:py-12 lg:py-16
```

---

## 🌓 Dark Mode

All colors automatically adapt! No need for dark: prefix in most cases.

### Manual Dark Mode Styling (if needed)
```tsx
className="bg-white dark:bg-black"
```

---

## 💡 Pro Tips

1. **Use `/5`, `/10`, `/20` opacity values** for subtle effects
2. **Combine `backdrop-blur-sm` with `bg-card/80`** for glassmorphism
3. **Add `transition-all duration-300`** to any interactive element
4. **Use `hover:scale-105`** for subtle lift effects
5. **Always include `rounded-2xl` or `rounded-3xl`** for modern look

---

## 🎨 Common Patterns

### Section Header
```tsx
<h2 className="text-4xl sm:text-5xl font-bold">
  Section Title
</h2>
<div className="h-px bg-gradient-to-r from-border to-transparent"></div>
```

### Glassmorphism Card
```tsx
<div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-3xl">
  {/* Content */}
</div>
```

### Hover Glow Effect
```tsx
<div className="relative group">
  <div className="absolute -inset-1 bg-foreground/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
  <div className="relative">
    {/* Content */}
  </div>
</div>
```

---

## 🚀 Quick Fixes

### Too much contrast?
- Change `bg-foreground/10` instead of `/5`
- Use `opacity-80` instead of `opacity-70`

### Want softer shadows?
- Change `shadow-2xl` to `shadow-xl`
- Reduce blur: `blur-xl` to `blur-lg`

### Slower animations?
- Change `duration-300` to `duration-500`
- Add `ease-in-out` for smoother feel

---

This is your complete black and white theme! 🎉
