const intl = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
});


export const DateValue = () => {
    const now = new Date();
    const value = intl.format(now);

    return <span className="text-sm text-muted">{value}</span>;
};