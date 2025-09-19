export function GoogleAnalytics() {
  return (
    <>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-Q956TTMZW7"
      ></script>
      <script>
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-Q956TTMZW7');
        `}
      </script>
    </>
  );
}
