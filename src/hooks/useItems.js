import {useDispatch, useSelector} from 'react-redux'

const ITEMS_LOADED = 'CalendarState/ITEMS_LOADED'

const names = ['Max', 'Philip', 'Alex', 'Irina', 'Vovan']
const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)
const labels = ['My Patrol', 'My Troop']

function itemsLoaded(items) {
  return {
    type: ITEMS_LOADED,
    items,
  }
}

const useItems = () => {
  const currItems = useSelector(state => state.calendar.items)
  const dispatch = useDispatch()

  return day => {
    if (currItems.length > 0) return

    const items = {}

    for (let i = -15; i < 85; i += 1) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000
      const strTime = new Date(time).toISOString().split('T')[0]
      if (!items[strTime]) {
        items[strTime] = []
        const numItems = randomNumber(0, 5)
        for (let j = 0; j < numItems; j += 1) {
          items[strTime].push({
            name: `Meeting with ${names[randomNumber(0, 4)]}`,
            time: `${randomNumber(0, 24)}:${randomNumber(0, 60)}`,
            labels: randomNumber(0, 1) ? [labels[randomNumber(0, 1)]] : [],
          })
        }
      }
    }

    const newItems = {}

    Object.keys(items).forEach(key => {
      newItems[key] = items[key]
    })

    // console.log(newItems)
    dispatch(itemsLoaded(newItems))
  }
}

export default useItems
