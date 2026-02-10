# 🤖 AI Instructions for MDY Promo Screen

## ⚠️ CRITICAL - READ FIRST ⚠️

### MANDATORY E2E SCREENSHOT PROTOCOL

**🚨 YOU MUST FOLLOW THIS EVERY SINGLE TIME 🚨**

After **ANY** code change (no exceptions), you **MUST** automatically run:

```bash
cd mdy-promo-screen && rm -rf e2e/screenshots/*.png && npm run test:e2e
```

**DO NOT:**
- ❌ Skip this step
- ❌ Ask the user if you should run it
- ❌ Wait for the user to request it
- ❌ Forget because you're focused on other tasks

**YOU MUST:**
- ✅ Run it automatically at the end of EVERY task
- ✅ Run it even for "small" changes
- ✅ Run it before saying you're done
- ✅ Include screenshot count in your summary

---

## 🎯 WHEN TO RUN SCREENSHOTS (Always!)

Run e2e screenshots **AUTOMATICALLY** when ANY of these files are modified:

1. ✅ `src/**/*.jsx` - Any React component changes
2. ✅ `src/**/*.css` - Any CSS/styling changes
3. ✅ `public/**/*` - Any public asset changes
4. ✅ `index.html` - HTML structure changes
5. ✅ `vite.config.js` - Build config changes

### Trigger Examples:
- Changed ContentCard.jsx? → **Run screenshots**
- Changed App.css? → **Run screenshots**
- Added logo image? → **Run screenshots**
- Changed layout? → **Run screenshots**
- Fixed a bug? → **Run screenshots**

---

## 📋 COMMAND SEQUENCE

```bash
# 1. Navigate to project directory
cd mdy-promo-screen

# 2. Clear old screenshots
rm -rf e2e/screenshots/*.png

# 3. Run e2e tests and capture new screenshots
npm run test:e2e

# 4. Verify screenshots were generated
ls -lh e2e/screenshots/ | wc -l
```

---

## ✅ TASK COMPLETION CHECKLIST

Before marking **ANY** task as complete, verify:

- [ ] Code changes are working
- [ ] Dev server reloaded successfully
- [ ] **E2E screenshots have been retaken** ← CRITICAL
- [ ] Screenshot count reported to user (should be 15+)
- [ ] Any test failures explained

---

## 📊 REPORTING TEMPLATE

When reporting task completion, use this format:

```
✅ [Task description] complete

Changes made:
- [List changes]

📸 E2E Screenshots: [X]/18 passed
   - [X] screenshots captured successfully
   - [Y] expected failures (if any)
   - [Z] new failures (if any)

🎯 View at http://localhost:3009
```

---

## 🚫 ANTI-PATTERNS (Don't Do This!)

**Wrong:**
```
I've made the changes. The ContentCard is now simplified.
[Ends task without running screenshots]
```

**Correct:**
```
I've made the changes. The ContentCard is now simplified.
[Automatically runs: cd mdy-promo-screen && rm -rf e2e/screenshots/*.png && npm run test:e2e]

📸 E2E Screenshots: 15/18 passed
   - 15 screenshots captured successfully
   - 3 expected failures (content visibility checks)

✅ Changes complete
```

---

## 🎨 CODE MODIFICATION GUIDELINES

### CSS Changes
- Always use CSS custom properties (design tokens) from `:root`
- Maintain logical properties (`inline-size`, `block-size`) for i18n
- Test accessibility (reduced motion, high contrast)
- **Run screenshots after CSS changes** ← Remember!

### React Component Changes
- Use functional components with hooks
- Keep components simple and flat (avoid deep nesting)
- Use semantic HTML when possible
- **Run screenshots after component changes** ← Remember!

### Image/Asset Changes
- Optimize images before adding
- Use appropriate formats (WebP, AVIF for photos; SVG for logos)
- Test at TV resolution (3840x2160)
- **Run screenshots after asset changes** ← Remember!

---

## 🔧 PROJECT-SPECIFIC NOTES

### TV Display Optimization
- Primary target: 55" TV (3840x2160 @ 1:1 scaling)
- Secondary target: 1920x1080 Full HD
- All text must be readable from 10 feet away
- Auto-scroll speed: 0.5px/frame (sponsors), 0.3px/frame (zmanim)

### Critical Files
- `src/App.jsx` - Main carousel logic
- `src/components/ContentCard/` - Static overlay with auto-scroll
- `public/assets/zmanim/*.json` - Halachic times data
- `scripts/fetch-zmanim.js` - Data fetching script (run every 90 days)

### Zmanim Data Management
```bash
# Refresh zmanim data (run every 90 days)
npm run fetch-zmanim
```

---

## 🆘 IF TESTS FAIL

1. **Check screenshot count**: Should be 15-18 screenshots
2. **Review test output**: Look for specific error messages
3. **Expected failures**: 3 tests checking `.first()` instead of `:nth-of-type(2)`
4. **Unexpected failures**: Investigate and fix before completing task
5. **Report to user**: Include failure count and description

---

## 💾 REMEMBER: Auto Memory

After completing tasks, update `MEMORY.md` with:
- Patterns that worked well
- Issues encountered and solutions
- Project-specific quirks
- Best practices discovered

---

## 🎯 QUICK REFERENCE

**Most important rule:** Run e2e screenshots after EVERY code change!

Command: `cd mdy-promo-screen && rm -rf e2e/screenshots/*.png && npm run test:e2e`

**No exceptions. No excuses. Always run it.** 🚨
