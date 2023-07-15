import Link from 'next/link';

export const NavbarButton = ({ href, onClick, content, className, ...props }) => {
    return (
        <button className={className} {...props}>
            <Link href={href}>
                {content}
            </Link>
        </button>
    );
};