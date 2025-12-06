import {ref, nextTick} from 'vue'

export function pagination () {


const LINE_HEIGHT = 56
const totalPage = ref(1)
const currentPage = ref(1)
const remaining = ref(0)
const view = ref(LINE_HEIGHT)
const prose = ref(null)

const calculateClientHight = () => {
    const rawView = prose.value.clientHeight
    return Math.max(Math.floor(rawView / LINE_HEIGHT) * LINE_HEIGHT,  LINE_HEIGHT)
}

const updateTotalPages = async () => {
    const proseEl = prose.value
    if (!proseEl) return

    proseEl.style.height = 'auto'
    remaining.value = 0
    await nextTick()

    view.value = calculateClientHight()
    proseEl.style.height = view.value + 'px'
    await nextTick()

    const totalHeight = proseEl.scrollHeight
    const remainder = totalHeight % view.value
    remaining.value = remainder === 0 ? 0 : (view.value - remainder)

    totalPage.value = Math.max(Math.ceil(totalHeight / view.value), 1)

    currentPage.value = Math.min( currentPage.value, totalPage.value)

    proseEl.scrollTo({top: (currentPage.value -1) * view.value, behavior: 'smooth'})

}

const prePage = () => {
    if (currentPage.value <=1 ) return 
    currentPage.value --
    prose.value.scrollTo({top : (currentPage.value - 1) * view.value, behavior: "smooth"})
}

const nextPage = () => {
    if (currentPage.value >= totalPage.value) return
    currentPage.value ++
    prose.value.scrollTo({top : (currentPage.value - 1) * view.value,  behavior: 'smooth'})
    
}

    return {
        prose, 
        currentPage,
        totalPage,
        remaining,
        updateTotalPages,
        prePage,
        nextPage
    }
}