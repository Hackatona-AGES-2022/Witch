import logo from "../../logo.svg";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return <img src={logo} alt="logo" className={className || "w-10"} />;
}
