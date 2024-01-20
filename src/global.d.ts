declare module '*.module.css';
declare module '*.module.scss';
declare module '*.svg' {
  const content: string;
  export default content;
}

declare module 'gatsby-plugin-dark-mode' {
  interface ThemeTogglerProps {
    children: (props: { theme: 'dark' | 'light'; toggleTheme: (theme: 'light' | 'dark') => void }) => React.ReactNode;
  }

  export const ThemeToggler: React.FC<ThemeTogglerProps>;
}
