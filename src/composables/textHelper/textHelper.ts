export function useTextHelper () {
  const capitalize = (text: string) => {
    return text[0].toUpperCase()+text.slice(1)
  }
  return {
    capitalize
  }
}
