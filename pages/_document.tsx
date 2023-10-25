import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html className="scroll-smooth">
            <Head>
				<link rel="preconnect" href="https://fonts.googleapis.com"/>
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
				<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </Head>
            <body className="cursor-default">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}