


export default function Input({label="Label", id="id",  ...props }) {
    const classes = type === 'text' ? 'text-button' : 'button';
    return (
        <div className='control'>
            <label for={id}>{label}</label>
            <input id={id} type="text" />
        </div>
    );
}