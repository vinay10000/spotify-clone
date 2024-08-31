import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  children: React.ReactNode;
  title: string;
  description: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onChange,
  children,
  title,
  description,
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-neutral-900/90 backdrop-blur-sm fixed inset-0" />
        <Dialog.Content
          className="fixed drop-shadow-md border
         border-neutral-700 top-[50%] left-[50%]
          max-h-full h-full md:h-auto md:max-h-[85vh]
           w-full md:w-[90vw] md:max-w-[450px]
            translate-x-[-50%] translate-y-[-50%]
             rounded-md bg-neutral-800 p-[25px]
              focus:outline-none"
        >
          <Dialog.Title className="text-xl text-center font-bold mb-4">
            {title}
          </Dialog.Title>
          <Dialog.Description className="text-sm text-center leading-normal mb-5">
            {description}
          </Dialog.Description>
          <div>{children}</div>

          <Dialog.Close
            asChild
            className="absolute top-[10px] right-[10px] inline-flex
             h-[25px] w-[25px] items-center justify-center
              rounded-full border-0 bg-neutral-800
               text-neutral-400 hover:text-white focus:outline-none"
          >
            <button>
              <IoMdClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
