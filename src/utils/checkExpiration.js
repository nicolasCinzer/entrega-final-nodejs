export const checkExpiration = exp => {
  const lifetime = Math.round(new Date().getTime() / 1000) > exp

  return lifetime
}
