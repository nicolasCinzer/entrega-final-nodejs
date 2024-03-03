export const showToast = ({
  text = '',
  duration = 5000,
  destination = null,
  newWindow = false,
  close = true,
  gravity = 'bottom',
  position = 'right',
  avatar = '',
  classeName = '',
  stopOnFocus = true,
  escapeMarkup = true,
  oldestFirst = true
}) => {
  const options = {
    text,
    duration,
    // On-click destination
    destination,
    // Open destination in new window
    newWindow,
    // Show toast close icon
    close,
    // Toast position - top or bottom
    gravity,
    // Toast position - left or right
    position,
    // Avatar
    avatar,
    // Additional classes for the toast
    classeName,
    // Prevents dismissing of toast on hover
    stopOnFocus,
    //  Toggle the default behavior of escaping HTML markup
    escapeMarkup,
    // set the order in which toasts are stacked in page
    oldestFirst
  }

  const toast = Toastify(options)

  toast.showToast()
}
