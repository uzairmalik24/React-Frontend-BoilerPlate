// src/components/ui/FormInputs.jsx
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// Base Input Wrapper (minimal, sleek)
const FormGroup = ({ label, error, children, required = false }) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-xs font-semibold text-foreground/70 uppercase tracking-wider">
                    {label}
                    {required && <span className="text-destructive ml-1">*</span>}
                </label>
            )}
            {children}
            {error && (
                <p className="text-xs text-destructive flex items-center gap-1 mt-1.5">
                    <span className="inline-block w-1 h-1 rounded-full bg-destructive"></span>
                    {error}
                </p>
            )}
        </div>
    );
};

// 1. Text / Email / URL / etc.
export const TextInput = ({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    required,
    className = '',
    ...props
}) => {
    return (
        <FormGroup label={label} error={error} required={required}>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`
          w-full px-4 py-3 rounded-lg
          bg-background/50 backdrop-blur-sm
          border border-border/40
          text-foreground placeholder:text-muted-foreground/60
          focus:outline-none focus:border-primary/60 focus:bg-background
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200
          ${error ? 'border-destructive/60 focus:border-destructive' : ''}
          ${className}
        `}
                required={required}
                {...props}
            />
        </FormGroup>
    );
};

// 2. Password with eye toggle
export const PasswordInput = ({
    label,
    value,
    onChange,
    error,
    placeholder = '••••••••',
    required,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormGroup label={label} error={error} required={required}>
            <div className="relative">
                <input
                    type={showPassword ? 'text' : 'password'}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`
            w-full px-4 py-3 pr-11 rounded-lg
            bg-background/50 backdrop-blur-sm
            border border-border/40
            text-foreground
            focus:outline-none focus:border-primary/60 focus:bg-background
            transition-all duration-200
            ${error ? 'border-destructive/60 focus:border-destructive' : ''}
          `}
                    required={required}
                    {...props}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                >
                    {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
            </div>
        </FormGroup>
    );
};

// 3. Number Input
export const NumberInput = ({
    label,
    value,
    onChange,
    error,
    min,
    max,
    step = '1',
    placeholder,
    required,
    ...props
}) => {
    return (
        <FormGroup label={label} error={error} required={required}>
            <input
                type="number"
                value={value}
                onChange={onChange}
                min={min}
                max={max}
                step={step}
                placeholder={placeholder}
                className={`
          w-full px-4 py-3 rounded-lg
          bg-background/50 backdrop-blur-sm
          border border-border/40
          text-foreground
          focus:outline-none focus:border-primary/60 focus:bg-background
          transition-all duration-200
          ${error ? 'border-destructive/60 focus:border-destructive' : ''}
        `}
                required={required}
                {...props}
            />
        </FormGroup>
    );
};

// 4. Single Select
export const SelectInput = ({
    label,
    value,
    onChange,
    options,
    placeholder = 'Select option...',
    error,
    required,
    disabled,
    className = '',
    ...props
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const optionsRef = useRef(null);

    const selectedOption = options.find(opt => opt.value === value);
    const filteredOptions = options.filter(opt =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            animateOpen();
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const animateOpen = () => {
        if (optionsRef.current) {
            gsap.fromTo(
                optionsRef.current,
                { opacity: 0, y: -10, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: 'power2.out' }
            );
        }
    };

    const closeDropdown = () => {
        if (optionsRef.current) {
            gsap.to(optionsRef.current, {
                opacity: 0,
                y: -10,
                scale: 0.95,
                duration: 0.15,
                ease: 'power2.in',
                onComplete: () => {
                    setIsOpen(false);
                    setSearchTerm('');
                }
            });
        } else {
            setIsOpen(false);
            setSearchTerm('');
        }
    };

    const handleSelect = (option) => {
        onChange({ target: { value: option.value } });
        closeDropdown();
    };

    return (
        <FormGroup label={label} error={error} required={required}>
            <div ref={dropdownRef} className="relative">
                {/* Select Button */}
                <button
                    ref={buttonRef}
                    type="button"
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    disabled={disabled}
                    className={`
                        w-full px-4 py-3 rounded-lg
                        bg-background border border-border
                        text-left text-foreground
                        flex items-center justify-between gap-2
                        focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                        disabled:opacity-50 disabled:cursor-not-allowed
                        transition-all duration-200
                        hover:bg-muted/50
                        ${error ? 'border-destructive focus:ring-destructive/20 focus:border-destructive' : ''}
                        ${isOpen ? 'ring-2 ring-primary/20 border-primary' : ''}
                        ${className}
                    `}
                >
                    <span className={selectedOption ? 'text-foreground' : 'text-muted-foreground'}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                    <IoChevronDown
                        className={`flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        size={18}
                    />
                </button>

                {/* Dropdown */}
                {isOpen && (
                    <div
                        ref={optionsRef}
                        className="absolute z-50 w-full mt-2 bg-background border border-border rounded-lg shadow-lg overflow-hidden"
                    >
                        {/* Search Input */}
                        {options.length > 5 && (
                            <div className="p-2 border-b border-border">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search..."
                                    className="w-full px-3 py-2 text-sm rounded-md bg-muted/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        )}

                        {/* Options List */}
                        <div className="max-h-60 overflow-y-auto">
                            {filteredOptions.length === 0 ? (
                                <div className="px-4 py-3 text-sm text-muted-foreground text-center">
                                    No options found
                                </div>
                            ) : (
                                filteredOptions.map((option) => {
                                    const isSelected = option.value === value;
                                    return (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => handleSelect(option)}
                                            className={`
                                                w-full px-4 py-2.5 text-left text-sm
                                                flex items-center justify-between gap-2
                                                transition-colors duration-150
                                                ${isSelected
                                                    ? 'bg-primary/10 text-primary font-medium'
                                                    : 'text-foreground hover:bg-muted/50'
                                                }
                                            `}
                                        >
                                            <span>{option.label}</span>
                                            {isSelected && (
                                                <IoCheckmark className="flex-shrink-0 text-primary" size={18} />
                                            )}
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </div>
                )}
            </div>
        </FormGroup>
    );
};
// 5. Multi Select (chips/tags style)
export const MultiSelect = ({
    label,
    values = [],
    onChange,
    options,
    placeholder = 'Select options...',
    error,
    required,
    maxSelections = 10,
}) => {
    const handleToggle = (value) => {
        if (values.includes(value)) {
            onChange(values.filter((v) => v !== value));
        } else if (values.length < maxSelections) {
            onChange([...values, value]);
        }
    };

    return (
        <FormGroup label={label} error={error} required={required}>
            <div className="flex flex-wrap gap-2 mb-2">
                {values.map((value) => {
                    const opt = options.find((o) => o.value === value);
                    return (
                        <div
                            key={value}
                            className="
                flex items-center gap-1.5
                bg-primary/10 text-primary
                px-3 py-1 rounded-full text-sm
                border border-primary/20
              "
                        >
                            {opt?.label || value}
                            <button
                                type="button"
                                onClick={() => handleToggle(value)}
                                className="text-primary hover:text-primary/70 transition-colors"
                            >
                                ×
                            </button>
                        </div>
                    );
                })}
            </div>

            <select
                multiple
                value={values}
                onChange={(e) => {
                    const selected = [...e.target.selectedOptions].map((opt) => opt.value);
                    onChange(selected);
                }}
                className={`
          w-full px-4 py-3 rounded-lg
          bg-background/50 backdrop-blur-sm
          border border-border/40
          text-foreground
          focus:outline-none focus:border-primary/60 focus:bg-background
          min-h-[42px]
          transition-all duration-200
          ${error ? 'border-destructive/60 focus:border-destructive' : ''}
        `}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <p className="text-xs text-muted-foreground/60 mt-1">
                Hold Ctrl/Cmd to select multiple
            </p>
        </FormGroup>
    );
};

// 6. Textarea
export const TextareaInput = ({
    label,
    value,
    onChange,
    placeholder,
    error,
    rows = 4,
    required,
    className = '',
    ...props
}) => {
    return (
        <FormGroup label={label} error={error} required={required}>
            <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className={`
          w-full px-4 py-3 rounded-lg
          bg-background/50 backdrop-blur-sm
          border border-border/40
          text-foreground placeholder:text-muted-foreground/60
          focus:outline-none focus:border-primary/60 focus:bg-background
          resize-y min-h-[80px]
          transition-all duration-200
          ${error ? 'border-destructive/60 focus:border-destructive' : ''}
          ${className}
        `}
                required={required}
                {...props}
            />
        </FormGroup>
    );
};

// 7. Checkbox
export const CheckboxInput = ({ label, checked, onChange, error, required }) => {
    return (
        <div className="flex items-start gap-2.5">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className={`
          mt-0.5 h-4 w-4 rounded border-border/40
          text-primary focus:ring-1 focus:ring-primary/30 focus:ring-offset-0
          transition-all duration-200
          ${error ? 'border-destructive' : ''}
        `}
                required={required}
            />
            <div>
                <label className="text-sm text-foreground/90 cursor-pointer">
                    {label}
                    {required && <span className="text-destructive ml-1">*</span>}
                </label>
                {error && (
                    <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-destructive"></span>
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
};

// 8. Radio Group
export const RadioGroup = ({ label, name, value, onChange, options, error, required }) => {
    return (
        <FormGroup label={label} error={error} required={required}>
            <div className="space-y-2.5">
                {options.map((option) => (
                    <label key={option.value} className="flex items-center gap-2.5 cursor-pointer">
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={value === option.value}
                            onChange={() => onChange(option.value)}
                            className="
                h-4 w-4 text-primary border-border/40
                focus:ring-1 focus:ring-primary/30 focus:ring-offset-0
                transition-all duration-200
              "
                        />
                        <span className="text-sm text-foreground/90">{option.label}</span>
                    </label>
                ))}
            </div>
        </FormGroup>
    );
};