import {ref, nextTick} from 'vue'

export function pagination (boxHeight, currentPage, totalPage, sendPages) {


const LINE_HEIGHT = 72

const remaining = ref(0)
const view = ref(LINE_HEIGHT)
const prose = ref(null)

// console.log('check boxheight', boxHeight)


const calculateClientHight = (boxHeight) => {
    
    const rawView = boxHeight
    // console.log('rawView', rawView)
    return Math.max(Math.floor(rawView / LINE_HEIGHT) * LINE_HEIGHT,  LINE_HEIGHT)

}


const updateTotalPages = async () => {
    const proseEl = prose.value
    if (!proseEl) return

    proseEl.style.height = 'auto'
    remaining.value = 0
    await nextTick()

    view.value = calculateClientHight(boxHeight)
    proseEl.style.height = view.value + 'px'
    await nextTick()

    // console.log("view ", view.value )

    const totalHeight = proseEl.scrollHeight
    const remainder = totalHeight % view.value
    remaining.value = remainder === 0 ? 0 : (view.value - remainder)

    totalPage.value = Math.max(Math.ceil(totalHeight / view.value), 1)

    // console.log('totalHeight ', totalHeight)
    // console.log('totalPage ', totalPage.value)
    currentPage.value = Math.min( currentPage.value, totalPage.value)

    proseEl.scrollTo({top: (currentPage.value -1) * view.value, behavior: 'smooth'})
    sendPages()
}

const scrollNewPage = (n) => {
    const target = Math.min(totalPage.value, Math.max(1, n))

    prose.value.scrollTo({top : (target -1 ) * view.value, behavior: "smooth"})
}



    return {
        view,
        prose, 
        remaining,
        updateTotalPages,
        scrollNewPage,
    }
}