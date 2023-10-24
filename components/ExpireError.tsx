import { useEffect, useState } from "react";

export const Expire = ({
    children,
    delay
}: {
    children: React.ReactNode,
    delay: number
}) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, delay);
        return () => clearTimeout(timer)
    }, [delay]);

    return visible ? <div>{children}</div> : <div />;
};