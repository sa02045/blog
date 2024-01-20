import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import React from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

export function DarkModeToggler() {
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => (
        <DarkModeSwitch checked={theme === 'dark'} onChange={e => toggleTheme(e ? 'dark' : 'light')} />
      )}
    </ThemeToggler>
  );
}

{
  /* <label>
<input
  type="checkbox"
  onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
  checked={theme === 'dark'}
/>
Dark mode
</label> */
}
