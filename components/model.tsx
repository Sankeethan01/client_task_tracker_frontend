// components/Modal.tsx
type Props = {
    children: React.ReactNode;
    onClose: () => void;
    title?: string;
  };
  
  export default function Modal({ children, onClose, title }: Props) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
        <div className="w-full max-w-md rounded-xl bg-white dark:bg-gray-900 p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {title ?? "Modal"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-600 text-lg"
            >
              ×
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  }
  