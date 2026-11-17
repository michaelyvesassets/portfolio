/**
 * Contact details. Left empty on purpose — fill these in with real values.
 * Empty entries render as labelled placeholders on the Contact page.
 */
export const contact: {
  email?: string;
  links: { label: string; href?: string }[];
} = {
  email: undefined, // e.g. "hello@yourdomain.com"
  links: [
    { label: "LinkedIn", href: undefined },
    { label: "GitHub", href: undefined },
    { label: "Dribbble / Behance", href: undefined },
  ],
};
