export const success = ({ res, message = '', features = [], redirect, ...restOfProperties }) => {
  if (redirect) return res.redirect(redirect)

  return res.json({ success: true, message, payload: features, ...restOfProperties })
}
