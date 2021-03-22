import React from 'react';
import Head from 'next/head';

export interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title?: string;
}

const Layout: React.FC<Props> = ({
  children,
  title = 'This is the default title',
  ...otherProps
}: Props) => (
  <div {...otherProps}>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header></header>
    {children}
    <footer></footer>
  </div>
);

export default Layout;
