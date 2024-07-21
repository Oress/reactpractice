


export default function Button({children, type, ...props}) {
    const classes = type === 'text' ? 'text-button': 'button';
    return (
        <button className={classes}>{children}</button>
    );
}