declare module "*.png";
declare module "*.svg";

// this is done so the typescript compiler 
// can recognise the props children
interface LayoutProps {
    children: React.ReactNode;
}
