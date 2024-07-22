


export default function Input({label="Label", id="id", errors=[], value='',  ...props }) {
    return (
        <div className='control'>
            <label htmlFor={id}>{label}</label>
            <input id={id} type="text" {...props} />
            <div className="errors">
                {errors.map((error, index) => <p key={index}>{error}</p>)}
            </div>
            
        </div>
    );
}