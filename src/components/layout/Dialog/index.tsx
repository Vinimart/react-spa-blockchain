import { useCallback, useEffect, useRef } from 'react'
import useMainStore from 'store/main'

const CLOSE_TIMEOUT = 3000

export default function Dialog() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { dialog, mutate } = useMainStore()

  const handleOpen = useCallback(() => dialogRef.current?.showModal(), [])

  const handleClose = useCallback(() => {
    dialogRef.current?.close()
    mutate('dialog', null)
  }, [mutate])

  useEffect(() => {
    if (!dialog) return

    handleOpen()

    if (!dialog.persist) {
      const timeout = setTimeout(() => {
        handleClose()
      }, CLOSE_TIMEOUT)

      return () => clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialog])

  return (
    <dialog className="modal" ref={dialogRef}>
      <div className="modal-box">
        <h3 className="text-lg font-bold">{dialog?.title}</h3>
        <p className="py-4">{dialog?.message}</p>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={handleClose}>
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
