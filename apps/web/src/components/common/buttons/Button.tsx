interface ButtonProps {
    color: 'primary' | 'secondary' | 'danger';
    name: string;
    textColor: string;
}

// Define the color mapping
const colorMapping: { [key in ButtonProps['color']]: string } = {
    primary: 'bg-blue-500',
    secondary: 'bg-gray-500',
    danger: 'bg-red-500',
};

export default function Button({ color, name, textColor }: ButtonProps) {
    const buttonColor = colorMapping[color];
    return (
        <button type="button" className={`rounded px-3 py-2 text-sm ${buttonColor} ${textColor}`}>
            {name}
        </button>
    )
}