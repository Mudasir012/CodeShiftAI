export default function PageContainer({ children, maxWidth = 'max-w-7xl' }) {
  return (
    <div className={`${maxWidth} mx-auto px-4 sm:px-6`}>
      {children}
    </div>
  )
}
