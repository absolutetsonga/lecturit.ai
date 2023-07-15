import Link from 'next/link';

const NavbarButton = ({ href, onClick, content, className, ...props }) => {
    return (
        <button className={className} {...props}>
            <Link href={href}>{content}</Link>
        </button>
    );
};

export default NavbarButton;
