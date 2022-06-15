export const isURL = (element: string | File) => {
  if (typeof element !== 'string') return false;
  return !!element.match( /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/)
}
