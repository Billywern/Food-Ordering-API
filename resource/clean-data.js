const csv = require('csvtojson')
const moment = require('moment')
const uuid =require('uuid')
const fs = require('fs')

readExcelFile = async () => {
  /**
   * To read csv file and convert to json
   */
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

filterRawData = async (data) => {
  /**
   *  To filter data that was converted from csv to an array of rows
   */
  const filteredData = data.map((rawData, index) => {
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
    
    newData.name = rawData.name

    const filteredOperationHours = filterOperationHours(rawData.operationHours)
    if (!filteredOperationHours) {
      console.log(`Operation hours data not cleaned at index ${index}, rawData - ${rawData}`, )
      return 
    }
    newData.operationHours = filteredOperationHours

    const filteredOffDays = filterOffDays(rawData.offDays)
    if (filteredOffDays.includes(undefined)) {
      console.log(`Off days data not cleaned at index ${index}, rawData - ${rawData}`, )
      return
    }
    newData.offDays = filteredOffDays

    newData.menu = []
    newData.menu.push(filterSetMenuToNameAndPrice(rawData.setOne))
    newData.menu.push(filterSetMenuToNameAndPrice(rawData.setTwo))
    newData.menu.push(filterSetMenuToNameAndPrice(rawData.setThree))
    newData.menu.push(filterSetMenuToNameAndPrice(rawData.setFour))
    newData.menu.push(filterSetMenuToNameAndPrice(rawData.setFive))

    if (newData.menu.includes(undefined)) {
      console.log(`Menu data not cleaned at index ${index}` - rawData)
      return
    }
    newData.restaurantId = uuid.v4() // Generate unique Id
    return newData
  })

  if (filteredData.includes(undefined)) {
    console.log(`Filtered data not clean enough`)
    return
  }
  await storeData({restaurants: filteredData})
}
filterOffDays = (offDays) => {
  /**
   *  To filter the off days of the restaurant.
   */
  const filteredOffDays = offDays.split(',').map((offDay) =>  {
    return moment(offDay.replace(/\s/g, ''), ["dddd"]).format("dddd")
  })

  if (filteredOffDays.includes(undefined)) {
    console.log(`Off days data not cleaned as seen here ${filteredOffDays}`)
    return
  }
  return filteredOffDays
}
filterOperationHours = (operationHours) => {
  /**
   * To filter the operation hours of the restaurant to start time and end time.
   */
  const filteredOperationHours = operationHours.split('-').map((operationHour) => {
    return moment(operationHour.replace(/\s/g, ''), ["h:mm A"]).format("HHmm")
  })
  if (filteredOperationHours.length > 2 || filteredOperationHours.includes(undefined)) {
    console.log(`Operation Hours data not cleaned as seen here ${filteredOperationHours}`, )
    return
  }

  if (filteredOperationHours[0] > filteredOperationHours[1]) {
    return {
      startTime: filteredOperationHours[1],
      endTime: filteredOperationHours[0] 
    }
  }
  return {
    startTime: filteredOperationHours[0],
    endTime: filteredOperationHours[1]
  }
}
filterSetMenuToNameAndPrice = (set) => {
  /**
   * To filter the set to name and price and a menu Id.
   */
  const name = set.substr(0, set.indexOf(' - MYR'))
  const amountFromSet = set.substr(set.indexOf('MYR'), set.length)
  const price = parseFloat(amountFromSet.replace('MYR', ''))
  if (price === NaN) {
    console.log(`Price is NaN at this set - ${set}`)
    return
  }
  return {
    menuId: uuid.v4(),
    price,
    name
  }
}
storeData = async (data) => {
  /**
   * To create a restaurants json that act as a restaurant database
   */
  try {
    await fs.writeFileSync('restaurants.json', JSON.stringify(data))
  } catch (err) {
    console.log('Error in storing data', err)
  }
}
init = async() => {
  const excelData = await readExcelFile()

  filterRawData(excelData)
}

init()