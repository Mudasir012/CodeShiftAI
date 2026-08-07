export default function ScrambleText({ text, className = '', as: Component = 'span', ...props }) {
  return (
    <Component className={`inline-block ${className}`} {...props}>
      {text}
    </Component>
  );
}
