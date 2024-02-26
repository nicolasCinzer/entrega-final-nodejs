export const success = ({ res, message = '', features = [], restOfProperties = {}, redirect }) => {
  if (redirect) return res.redirect(redirect)

  return res.json({ message, payload: features, ...restOfProperties })
}
