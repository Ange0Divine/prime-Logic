# Prime Logic Forms System

## Overview
Comprehensive form system with validation, spam protection, and WhatsApp integration for Prime Logic's contact page.

## Features

### 1. **Three Specialized Forms**

#### Logic Audit Request Form
- **Purpose**: Request a diagnostic audit before project investment
- **Fields**:
  - Personal: Name, Company, Role, Email, Phone
  - Audit Details: Focus area, Organization size, Timeline, Budget, Meeting time
  - Challenge description (min 50 chars, max 1000)
- **Use Case**: Organizations seeking clarity before digital transformation

#### Proposal Request Form
- **Purpose**: Request a scoped proposal for a specific project
- **Fields**:
  - Personal: Name, Company, Role, Email, Phone
  - Project Details: Service interest, Budget, Timeline, Meeting time
  - Challenge description (min 50 chars, max 1000)
  - Desired outcomes (max 500 chars)
- **Use Case**: Organizations ready to move forward with a defined project

#### Newsletter Signup Form
- **Purpose**: Subscribe to monthly insights and thought leadership
- **Fields**:
  - Personal: Name, Email, Company, Role
  - Topics of interest
- **Use Case**: Professionals seeking ongoing education and insights

### 2. **Tab Switcher Interface**
- Clean tab navigation between forms
- Active state indicators
- Smooth transitions
- Mobile-friendly design
- Keyboard accessible

### 3. **Validation System**

#### Client-Side Validation
- **Real-time validation** on blur and input
- **Visual feedback** with error/success states
- **Custom error messages** for each rule
- **Field-level validation** before submission

#### Validation Rules
```javascript
required    // Field must not be empty
email       // Valid email format
phone       // Valid phone number (7-20 digits)
minlen:n    // Minimum character length
```

#### Error Display
- Red border on invalid fields
- Error message below field
- Clear on valid input
- Focus on first error

### 4. **Spam Protection**

#### Honeypot Technique
```html
<div class="form-pot" aria-hidden="true">
  <input type="text" name="website" tabindex="-1" autocomplete="off">
</div>
```
- Hidden field invisible to humans
- Bots typically fill all fields
- Submission blocked if honeypot filled
- No CAPTCHA needed (better UX)

#### Cooldown System
- 10-second cooldown between submissions
- Prevents rapid-fire spam
- User-friendly error message
- Per-form tracking

#### Additional Protection
- Form type validation
- Data sanitization
- Character limits
- Required field enforcement

### 5. **WhatsApp Integration**

#### How It Works
1. User fills form and clicks submit
2. JavaScript validates all fields
3. Data formatted into structured message
4. WhatsApp opened with pre-filled message
5. User reviews and sends

#### Message Templates

**Logic Audit:**
```
Hello Prime Logic Team. I'd like to request a Logic Audit.

Name: John Doe
Organization: Acme Corp
Role / Title: CEO

Email: john@acme.com
Phone: +250 XXX XXX XXX

Audit Focus: Full four-pillar audit
Organization Size: 11-50 employees
Timeline: 1 month
Budget Range: $10,000 - $25,000
Preferred Meeting Time: Morning (8am-12pm EAT)

Challenge / Goal:
[User's description here]

Please advise on next steps.
```

**Proposal Request:**
```
Hello Prime Logic Team. I'd like to request a Proposal.

Name: John Doe
Organization: Acme Corp
Role / Title: CTO

Email: john@acme.com
Phone: +250 XXX XXX XXX

Service Interest: Technology (Innovation)
Budget Range: $25,000 - $50,000
Timeline: 2-3 months
Preferred Meeting Time: Afternoon (12pm-5pm EAT)

Project / Challenge Description:
[User's description here]

Desired Outcomes:
[User's goals here]

Please send a scoped proposal.
```

**Newsletter:**
```
Hello Prime Logic Team. I'd like to subscribe to your Insights newsletter.

Name: John Doe
Email: john@acme.com
Organization: Acme Corp
Role: Manager
Topics of Interest: Strategy & Planning

Please add me to your mailing list.
```

### 6. **Character Counters**
- Live character count for textareas
- Visual feedback (normal/warning/over)
- Helps users stay within limits
- Color-coded states:
  - Normal: Gray
  - Warning (>85%): Orange
  - Over limit: Red

### 7. **Success Feedback**
- Success banner appears after submission
- Confirms WhatsApp opened
- Provides next steps
- Auto-scrolls into view
- Dismissible

### 8. **Responsive Design**

#### Desktop (>768px)
- Two-column layout (form + info panel)
- Side-by-side fields in rows
- Full-width buttons
- Optimal spacing

#### Tablet (768px)
- Single column layout
- Stacked form rows
- Adjusted spacing
- Touch-friendly targets

#### Mobile (<480px)
- Compact spacing
- Smaller text inputs
- Full-width everything
- Optimized for thumb reach

## Technical Implementation

### HTML Structure
```html
<div class="form-tabs-container">
  <!-- Tab Switcher -->
  <div class="form-tabs">
    <button class="form-tab active" data-tab="form-id">Tab Name</button>
  </div>
  
  <!-- Form Panel -->
  <div class="form-panel active" id="form-id">
    <form data-wa-form data-form-type="logic-audit">
      <!-- Honeypot -->
      <div class="form-pot" aria-hidden="true">
        <input type="text" name="website" tabindex="-1">
      </div>
      
      <!-- Field Wrapper -->
      <div class="form-field-wrap">
        <label class="form-label" for="field-id">
          Label <span class="required">*</span>
        </label>
        <input 
          class="form-field" 
          id="field-id" 
          name="field_name"
          data-validate="required email"
          autocomplete="email"
        >
        <div class="field-error"></div>
      </div>
    </form>
  </div>
</div>
```

### JavaScript Integration

#### Form Binding
```javascript
// Automatically binds all forms with [data-wa-form]
document.querySelectorAll('[data-wa-form]').forEach(bindForm);
```

#### Validation
```javascript
// Add validation rules to fields
data-validate="required email minlen:50"

// Validation happens on:
// - Blur (when user leaves field)
// - Input (if field has error)
// - Submit (all fields)
```

#### Custom Form Types
```javascript
// Define in data-form-type attribute
data-form-type="logic-audit"
data-form-type="proposal"
data-form-type="newsletter"

// Each type has custom message builder
```

### CSS Classes

#### Form States
```css
.form-field              // Base field style
.form-field.field--error // Error state (red border)
.form-field.field--valid // Valid state (green border)
```

#### Layout
```css
.form-field-wrap         // Field container
.form-row                // Two-column row
.form-group              // Form container
.form-tabs               // Tab switcher
.form-panel              // Tab content panel
```

#### Feedback
```css
.field-error             // Error message
.field-counter           // Character counter
.form-success            // Success banner
```

## Usage Guide

### Adding a New Field

1. **Wrap in form-field-wrap:**
```html
<div class="form-field-wrap">
  <label class="form-label" for="field-id">
    Field Label <span class="required">*</span>
  </label>
  <input 
    class="form-field" 
    id="field-id" 
    name="field_name"
    type="text"
    placeholder="Placeholder text"
    data-validate="required"
    autocomplete="name"
  >
  <div class="field-error"></div>
</div>
```

2. **Add validation rules:**
- `required` - Field must have value
- `email` - Must be valid email
- `phone` - Must be valid phone
- `minlen:50` - Minimum 50 characters

3. **Add to message builder:**
```javascript
// In main.js, update the builder function
builders['form-type'] = function(d) {
  var lines = [
    'Field Label: ' + d('field_name')
  ];
  return lines.join('\n');
}
```

### Creating Two-Column Row
```html
<div class="form-row">
  <div class="form-field-wrap">
    <!-- First field -->
  </div>
  <div class="form-field-wrap">
    <!-- Second field -->
  </div>
</div>
```

### Adding Character Counter
```html
<textarea 
  class="form-field" 
  name="description"
  data-maxlen="1000"
></textarea>
<div class="field-counter"></div>
```

### Making Field Optional
Simply don't add `required` to data-validate:
```html
<input 
  class="form-field" 
  name="optional_field"
  data-validate="email"  <!-- Only validates if filled -->
>
```

## Best Practices

### 1. **Field Naming**
- Use snake_case for field names
- Be descriptive: `meeting_time` not `mt`
- Match backend expectations

### 2. **Validation**
- Validate on blur for better UX
- Show errors immediately
- Clear errors on valid input
- Focus first error on submit

### 3. **Labels**
- Always use labels for accessibility
- Mark required fields with asterisk
- Use `for` attribute to link to input

### 4. **Autocomplete**
- Use standard autocomplete values
- Helps browsers autofill
- Improves mobile experience

### 5. **Placeholders**
- Use as examples, not labels
- Keep short and clear
- Don't rely on them alone

### 6. **Error Messages**
- Be specific and helpful
- Suggest how to fix
- Use friendly language

### 7. **Success Feedback**
- Confirm action taken
- Explain next steps
- Provide reassurance

## Accessibility

### ARIA Labels
```html
<button aria-label="Toggle navigation">
<div aria-hidden="true">  <!-- For decorative elements -->
```

### Keyboard Navigation
- Tab through fields
- Enter to submit
- Escape to close (mobile nav)
- Focus management on errors

### Screen Readers
- Proper label associations
- Error announcements
- Success confirmations
- Hidden honeypot

### Color Contrast
- WCAG AA compliant
- Error states clearly visible
- Focus indicators prominent

## Testing Checklist

### Functionality
- [ ] All fields validate correctly
- [ ] Error messages display properly
- [ ] Success banner appears
- [ ] WhatsApp opens with message
- [ ] Honeypot blocks spam
- [ ] Cooldown prevents rapid submission
- [ ] Tab switcher works
- [ ] Character counters update

### Validation
- [ ] Required fields enforced
- [ ] Email format validated
- [ ] Phone format validated
- [ ] Min length enforced
- [ ] Max length enforced
- [ ] Errors clear on fix

### Responsive
- [ ] Desktop layout correct
- [ ] Tablet layout correct
- [ ] Mobile layout correct
- [ ] Touch targets adequate
- [ ] Text readable on all sizes

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Focus indicators visible
- [ ] Color contrast sufficient
- [ ] Labels properly associated

### Cross-Browser
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

## Troubleshooting

### Form Not Submitting
1. Check console for errors
2. Verify all required fields filled
3. Check validation rules
4. Ensure data-wa-form attribute present

### Validation Not Working
1. Check data-validate attribute
2. Verify field has name attribute
3. Check JavaScript loaded
4. Look for console errors

### WhatsApp Not Opening
1. Check phone number in main.js
2. Verify message builder exists
3. Check URL encoding
4. Test on mobile device

### Honeypot Triggering
1. Ensure field is hidden
2. Check tabindex="-1"
3. Verify aria-hidden="true"
4. Test with real user behavior

## Maintenance

### Regular Tasks
- Monitor form submissions
- Check error rates
- Update validation rules
- Review message templates
- Test on new devices

### Updates
- Keep phone number current
- Update service options
- Refresh budget ranges
- Adjust timeline options

## Support

For questions or issues:
- Email: info@primelogiclab.com
- Phone: +250 796 694 798
- WhatsApp: https://wa.me/250796694798

---

**Version:** 1.0  
**Last Updated:** January 2025  
**Maintained by:** Prime Logic LTD
