const formatNumber = (number: number): string => {
  const suffixes: string[] = ['', 'K', 'M', 'B', 'T']
  let suffixIndex: number = 0

  while (number >= 1000 && suffixIndex < suffixes.length - 1) {
    suffixIndex++
    number /= 1000
  }

  const formattedNumber: string = number.toFixed(1) + suffixes[suffixIndex]

  return formattedNumber
}

export { formatNumber }
