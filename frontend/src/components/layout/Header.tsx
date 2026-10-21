import type { ReactNode } from "react";

interface HeaderProps {
  title: string;
  text?: string;
  // Başlığın altına konacak içerik (menü). Header onu sadece yerine koyar.
  children?: ReactNode;
}

function Header({ title, text, children }: HeaderProps) {
  return (
    <header className="site-baslik">
      <div className="kabuk">
        <h1>{title}</h1>
        {text && <p className="alt-baslik">{text}</p>}
        {children}
      </div>
    </header>
  );
}

export default Header;
