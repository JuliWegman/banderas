import '../styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <title>Banderas</title>
        <link id="favicon" rel='icon' href='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png' type='image/png' sizes='16x16'/>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
