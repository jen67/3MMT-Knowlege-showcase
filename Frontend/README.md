# Wefind

<details>
<summary>Get Details of how the variables and classes are used in this project</summary>

---

Welcome to the documentation for **Wfind**! Below you'll find detailed information on how to use the variables and utility classes provided in this project. **And this variables are found in the `wefind\src\App.css` file.**

## Variables

### Colors

- **Primary Colors:**
  - `--footer-blue`: #002880
  - `--btn-blue`: #0940af
  - `--bright`: #0c63e7
  - `--dbheading`: #031633
  - `--paragrah`: #010b1a

- **Secondary Colors:**
  - `--white`: #ffffff
  - `--light-blue`: #f8f9fb

### Font Families

- `--ff-salsa`: "Salsa", cursive
- `--ff-poppins`: "Poppins", sans-serif

### Font Sizes

- `--fs1`: 0.8rem
- `--fs2`: 1rem
- `--fs3`: 1.5rem
- `--fs4`: 2rem
- `--fs5`: 2.5rem
- `--fs6`: 3rem
- `--fs7`: 3.5rem
- `--fs8`: 4rem
- `--fs9`: 4.5rem
- `--fs10`: 5rem

### Font Weights

- `--fw1`: 200
- `--fw2`: 300
- `--fw3`: 400
- `--fw4`: 500
- `--fw5`: 600
- `--fw6`: 700
- `--fw7`: 800
- `--fw8`: 900

### Padding and Margin

- **Padding:**
  - `--pad1` to `--pad10`

- **Margin:**
  - `--mar1` to `--mar10`

## Utility Classes

### Reset

This section includes general reset styles for various HTML elements.

### General Classes

- `.center-content`: Center items horizontally and vertically.
- `.container-full`: Full-width container with centered content.
- `.flex-row`: Flex container with row direction.
- `.flex-column`: Flex container with column direction.
- `.flex-wrap`: Enable flex items to wrap.
- `.justify-between`: Justify content evenly between flex items.
- `.align-center`: Align items vertically centered.

### Cursor Event

- `.cursor-pointer`: Apply a pointer cursor on hover.

### Utility Colors

- `.bg-btn`: Apply background color for buttons.
- `.bg-footer`: Apply background color for footers.
- `.text-white`: Set text color to white.
- `.header-text-color`: Set color for header text.
- `.paragraph-color`: Set color for paragraphs.
- `.special`: Apply special font and color combination.

### Display Classes

- `.d-none`: Hide an element.
- `.d-block`: Display an element as a block.
- `.d-inline`: Display an element as inline.
- `.d-inline-block`: Display an element as inline-block.
- `.d-flex`: Display an element as flex container.

## Examples

### here are some examples of how you can use the variables and utility classes in your code

### Using Variables in CSS

```css
/* Using color variables 
===================================*/
body {
  background-color: var(--light-blue);
}

h1 {
  color: var(--dbheading);
}

button {
  background-color: var(--btn-blue);
  color: var(--white);
}

/* Using font family variables 
======================================*/
h1, h2, h3 {
  font-family: var(--ff-salsa);
}

p, span {
  font-family: var(--ff-poppins);
}

/* Using font size variables 
=======================================*/
h1 {
  font-size: var(--fs10);
}

p {
  font-size: var(--fs2);
}

/* Using font weight variables 
======================================*/
h1 {
  font-weight: var(--fw8);
}

p {
  font-weight: var(--fw2);
}

/* Using padding and margin variable
=========================================*/
.container {
  padding: var(--pad5);
  margin: var(--mar2);
}
```

### Using Utility Classes in HTML

```html
<!-- Using general classes -->
<div class="container-full center-content">
  <h1 class="header-text-color">Hello, World!</h1>
  <p class="paragraph-color">This is a paragraph with custom colors.</p>
</div>

<!-- Using cursor event class -->
<button class="cursor-pointer">Click me</button>

<!-- Using color classes -->
<div class="bg-footer">
  <p class="text-white">This is a footer with custom background color.</p>
</div>

<!-- Using display classes -->
<div class="d-flex justify-between">
  <div class="d-block">This is a block element.</div>
  <div class="d-none">This is a hidden element.</div>
</div>
```

### Using Variables and Utility Classes in React

```jsx
import React from 'react';
import './styles.css'; // Assuming your styles are imported from a CSS file

function MyComponent() {
  return (
    <div className="container-full bg-btn">
      <h1 className="header-text-color">Hello, World!</h1>
      <p className="paragraph-color">This is a paragraph with custom colors.</p>
      <button className="cursor-pointer">Click me</button>
    </div>
  );
}

export default MyComponent;
```

<details>
<summary>📸 Images Module 🖼️ (Click to expand)</summary>

This module, `images.js`, is a centralized place for all the images used in the application. It imports all the images from the `assets/images` directory and exports them as an `images` object. This makes it easy to import and use these images anywhere in the application. 🚀

## 📁 Structure

The `images.js` file is structured as follows:

1. Each image is imported from the `assets/images` directory. The imported image is assigned to a variable with a descriptive name, such as `logo` or `menuIcon`.
2. These variables are then added as properties to the `images` object.
3. The `images` object is exported as the default export of the module.

Here's a simplified example:

```javascript
import logo from '../assets/images/logo.png';
import menuIcon from '../assets/images/menu.svg';

const images = {
  logo,
  menuIcon,
};

export default images;
