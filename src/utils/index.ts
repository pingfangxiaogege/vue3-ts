export function firstUppcase(name: string): string {
  return name.replace(/\b(\w)(\w*)/g, function($0, $1, $2) {
    return $1.toUpperCase() + $2.toLowerCase()
  })
}