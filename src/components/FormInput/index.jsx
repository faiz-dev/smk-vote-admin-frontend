
export const Input = ({label, name, type, placeholder ="", value, onChangeValue, vertical = true, className = ''}) => {
    const change = (e) => {
        onChangeValue(e.target.value)
    }
    return (
        <div className={`${!vertical ? 'flex items-center': 'flex flex-col'} mb-4 ${className}`}>
            <label className="text-sm">{label}</label>
            <input className={`py-2 px-3 border-2 rounded ${vertical ? 'mt-2' : 'grow'} `} 
                    type={type} 
                    name={name} 
                    placeholder={placeholder}
                    value={value}
                    onChange={e => onChangeValue(e.target.value)} />
        </div>
    )
}

export const TextArea = ({label, name, type, placeholder ="", value, onChangeValue, vertical = true, className = ''}) => {
    return (
        <div className={`${!vertical ? 'flex items-center': 'flex flex-col'} mb-4 ${className}`}>
            <label className="text-sm">{label}</label>
            <textarea 
                className={`py-2 px-3 border-2 rounded ${vertical ? 'mt-2' : 'grow'} `}
                name={name} 
                value={value}
                onChange={e => onChangeValue(e.target.value)}
                placeholder={placeholder}
                >{placeholder}</textarea>
        </div>
    )
}


export const Select = ({label, name, value, onChangeValue, vertical = true, options =[], showlabel = true, className = ''}) => {
    
    return (
        <div className={`${!vertical ? 'flex items-center': 'flex flex-col'} mb-4 ${className}` }>
            {showlabel ? (<label className="text-sm">{label}</label>) : ''}
            <select className="py-2 px-3 border-2 rounded mt-2" 
                name={name}
                value={value}
                onChange={e => onChangeValue(e.target.value)}>
                    <option>Pilih {label || name}</option>
                    {options.map((o) => (
                        <option value={o.value ?? o.text} key={`opt${o.value || o.text}`}>{o.text}</option>
                    ))}
            </select>
        </div>
    )
}