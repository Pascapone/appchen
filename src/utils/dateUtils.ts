export const dateToGermanString = (date: Date) : string => {
  return `${("0" + date.getDate()).slice(-2)}.${("0" + (date.getMonth() + 1)).slice(-2)}.${date.getFullYear()}`
}

export const awsTimeToMilliseconds = (timeString: string) : number => {
  const strip = timeString.slice(0, -4)
  const times = strip.split(':')

  return times.reduce((accumulator, currentValue, index) => {    
    let number = Number(currentValue)
    switch (index) {
      case 0:
        number *= 60*60*1000
        break
      case 1:
        number *= 60*1000
        break
      case 2:
       number *= 1000
        break
    }
    return accumulator + number
  }, 0)
}

export const addAwsTimeToISODateString = (ISODateString: string, timeString: string) : string => {
	const milliseconds = awsTimeToMilliseconds(timeString)
    const date = new Date(ISODateString)
    return new Date(date.getTime() + milliseconds).toISOString()
}

export const msToAWSDateTime = (milliseconds: number) : string => {
	let h = Math.floor(milliseconds/(60*60*1000));
    let diff = milliseconds-(h*60*60*1000);
    let m = Math.floor(diff/(60*1000));
    diff = diff-(m*60*1000);
    let s = Math.floor(diff/(1000));
  	diff = diff-(s*1000);
  	let ms = diff
    
    return ("0" + h).slice(-2) + ":" + ("0" + m).slice(-2) + ":" + ("0" + s).slice(-2) + "." + ("00" + ms).slice(-3)
}