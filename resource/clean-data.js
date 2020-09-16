const csv = require('csvtojson')
 
// File path.
readExcelFile = async () => {
  try {
    const data = await csv().fromFile('./Data.csv')
    if (!data) {
      console.error('Data does not exist!')
      return
    }
    return data
  } catch (error) {
    console.log('Error occur while reading', error)
  }
}

filterRawData = (data) => {
  data.map((rawData, index) => {
    console.log(rawData)
    const newData = {}
    if (!rawData ||
        !rawData.name ||
        !rawData.operationHours ||
        !rawData.offDays ||
        !rawData.setOne ||
        !rawData.setTwo ||
        !rawData.setThree ||
        !rawData.setFour ||
        !rawData.setFive
      ) {
      console.log(`Missing details at index ${index}, rawData - ${rawData}`)
      return
    }
    
    newData.restaurantName = rawData.name

    // const filteredOperationHours = rawData.operationHours.split('-').map((time) => )
    
    
  })
}

init = async() => {
  const excelData = await readExcelFile()

  filterRawData(excelData)
}

init()