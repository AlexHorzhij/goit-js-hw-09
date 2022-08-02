import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
  return Promise.resolve({position, delay})
} else {
  return Promise.reject({position, delay})
  }
}


const form = document.querySelector('.form')

form.addEventListener('submit', onSubmitForm)

function onSubmitForm(e) {
  e.preventDefault()
  const { delay, step, amount } = e.currentTarget
  console.log(delay.value, step.value, amount.value)

  let totalDelay = Number(delay.value)
  let totalTextDelay = Number(delay.value)

  const stepDelay = step.value

  for (let i = 1; i <= amount.value; i += 1) {

    setTimeout(() => {
      createPromise(i, totalTextDelay).then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
      }).catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      })
      
      totalTextDelay += Number(stepDelay)
    }, totalDelay)

    totalDelay += Number(stepDelay)
  }

  e.currentTarget.reset()
}
 


